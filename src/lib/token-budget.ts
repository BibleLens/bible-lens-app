// src/lib/token-budget.ts
// Token estimation and sliding window pruner for conversation history
// Keeps the messages array sent to Claude within a predictable token budget

/**
 * Default token budget for conversation history messages.
 *
 * Rationale: Claude Sonnet has a 200K context window. Typical per-request overhead:
 *   - System prompt: ~350 tokens
 *   - RAG context: ~1500 tokens (worst case)
 *   - max_tokens output: 1024
 *   Total overhead: ~2900 tokens
 *
 * An 8000-token conversation budget keeps total input well under 12K tokens per
 * request, keeping costs predictable at ~$0.003–0.004 per exchange even in long
 * conversations. Adjust this constant to tune the cost/context tradeoff.
 */
export const CONVERSATION_TOKEN_BUDGET = 8000;

/**
 * Estimates the token count for a string using the standard Claude heuristic
 * of ~4 characters per token. Slightly overestimates (safe side) for English text.
 *
 * Using the heuristic instead of `messages.countTokens()` avoids an extra API
 * call per request, eliminating added latency and cost.
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

interface ConversationMessage {
  role: string;
  content: string;
}

interface PruneResult {
  pruned: ConversationMessage[];
  originalCount: number;
  prunedCount: number;
  estimatedTokens: number;
}

/**
 * Sliding window pruner that returns the most recent messages that fit within
 * the given token budget.
 *
 * Algorithm (backward pass):
 *   1. Iterate from the END of the messages array backward.
 *   2. Accumulate estimated token counts per message.
 *   3. Stop when adding the next message would exceed the budget.
 *   4. If the resulting window starts with an assistant message (orphaned because
 *      its paired user message was dropped), discard that leading assistant message
 *      so the array always starts with a user turn (Claude API requirement).
 *
 * Edge case: If even a single message exceeds the budget, include it anyway.
 * Never returns an empty array — the latest user message is always preserved.
 */
export function pruneToTokenBudget(
  messages: ConversationMessage[],
  tokenBudget: number
): PruneResult {
  const originalCount = messages.length;

  if (originalCount === 0) {
    return { pruned: [], originalCount: 0, prunedCount: 0, estimatedTokens: 0 };
  }

  // Backward pass: collect messages from most recent until budget exhausted
  let accumulatedTokens = 0;
  let startIndex = originalCount; // exclusive upper bound, will be decremented

  for (let i = originalCount - 1; i >= 0; i--) {
    const msgTokens = estimateTokens(messages[i].content);

    if (accumulatedTokens + msgTokens > tokenBudget && startIndex < originalCount) {
      // Adding this message would exceed budget AND we already have at least one message
      break;
    }

    accumulatedTokens += msgTokens;
    startIndex = i;
  }

  let window = messages.slice(startIndex);

  // Ensure window starts with a user message (Claude API requires alternating roles
  // starting with user). If pruning left an orphaned assistant message at the front,
  // drop it.
  while (window.length > 0 && window[0].role === 'assistant') {
    accumulatedTokens -= estimateTokens(window[0].content);
    window = window.slice(1);
  }

  // Edge case: if window is somehow empty (shouldn't happen), fall back to last message
  if (window.length === 0 && originalCount > 0) {
    const lastMsg = messages[originalCount - 1];
    window = [lastMsg];
    accumulatedTokens = estimateTokens(lastMsg.content);
  }

  return {
    pruned: window,
    originalCount,
    prunedCount: window.length,
    estimatedTokens: accumulatedTokens,
  };
}
