"use client";

import { useEffect, useRef, useState } from "react";
import { LensIcon } from "@/components/LensIcon";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Source {
  index: number;
  title: string;
  url?: string;
}

type ErrorKind = "rate_limit" | "server" | "network" | "unknown";

interface ErrorState {
  kind: ErrorKind;
  message?: string;
  retryAfter?: number; // seconds
}

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SUGGESTED_QUESTIONS = [
  "What did Jesus mean in Matthew 24?",
  "Who is the Last Adam?",
  "What is the Kingdom of God?",
  "Ancient cosmology in Genesis 1",
];

const CITATIONS_DELIMITER = "\n\n---\n**Sources:**\n";
const SOURCE_REGEX = /^\[(\d+)\]\s+(.+?)(?:\s+—\s+(.+))?$/;

function parseSources(rawSources: string): Source[] {
  const results: Source[] = [];
  for (const line of rawSources.split("\n")) {
    if (!line.trim()) continue;
    const match = line.match(SOURCE_REGEX);
    if (!match) continue;
    results.push({
      index: parseInt(match[1], 10),
      title: match[2].trim(),
      url: match[3]?.trim() || undefined,
    });
  }
  return results;
}

import { renderMarkdown } from "@/lib/markdown";

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{
            background: "var(--color-text-muted)",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — silent fail
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy response"}
      className="p-1.5 rounded-md transition-colors flex items-center gap-1"
      style={{ color: "var(--color-text-muted)" }}
    >
      {copied ? (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            style={{ color: "var(--color-cyan-400)" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span style={{ color: "var(--color-cyan-400)", fontSize: "0.875rem" }}>
            Copied!
          </span>
        </>
      ) : (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      )}
    </button>
  );
}

function SourcesPanel({ sources }: { sources: Source[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-base transition-colors"
        style={{ color: "var(--color-text-muted)" }}
      >
        <svg
          className="w-4 h-4 transition-transform"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        Sources ({sources.length})
      </button>

      {open && (
        <ul className="mt-2 space-y-1.5">
          {sources.map((s) => (
            <li key={s.index}>
              <div
                className="rounded-lg px-3 py-2 text-base"
                style={{
                  background: "var(--color-bg-elevated)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span
                  className="font-mono mr-1.5"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  [{s.index}]
                </span>
                {s.url ? (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:underline"
                    style={{ color: "var(--color-cyan-400)" }}
                  >
                    {s.title}
                  </a>
                ) : (
                  <span style={{ color: "var(--color-text-secondary)" }}>
                    {s.title}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const isEmpty = message.content === "";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className="rounded-xl px-4 py-3 max-w-[85%] md:max-w-[70%]"
        style={{
          background: isUser
            ? "rgba(34, 211, 238, 0.12)"
            : "var(--color-bg-secondary)",
          border: isUser
            ? "1px solid rgba(34, 211, 238, 0.25)"
            : "1px solid var(--color-border)",
        }}
      >
        {isUser ? (
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--color-text-primary)" }}
          >
            {message.content}
          </p>
        ) : (
          <>
            {isEmpty ? (
              <TypingDots />
            ) : (
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--color-text-primary)" }}
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(message.content),
                }}
              />
            )}
            {message.sources && message.sources.length > 0 && (
              <SourcesPanel sources={message.sources} />
            )}
            {!isEmpty && (
              <div className="flex justify-end mt-2">
                <CopyButton text={message.content} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ChatInterface({ initialQuery }: { initialQuery?: string } = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);
  const [retryCountdown, setRetryCountdown] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastQuestionRef = useRef<string>("");
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const didAutoSubmitRef = useRef(false);
  const isStreamingRef = useRef(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Rate limit countdown
  useEffect(() => {
    if (error?.kind === "rate_limit" && error.retryAfter && error.retryAfter > 0) {
      setRetryCountdown(error.retryAfter);
      countdownRef.current = setInterval(() => {
        setRetryCountdown((n) => {
          if (n <= 1) {
            if (countdownRef.current) clearInterval(countdownRef.current);
            setError(null);
            return 0;
          }
          return n - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [error]);

  // Auto-submit initial query from URL param — ref guard prevents double-fire
  useEffect(() => {
    if (initialQuery && !didAutoSubmitRef.current) {
      didAutoSubmitRef.current = true;
      submitQuestion(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  // Textarea auto-grow (up to 4 lines)
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 4 * 24 + 32) + "px";
  };

  // Clear conversation — resets all chat state
  const clearConversation = () => {
    setMessages([]);
    setInput("");
    setError(null);
    didAutoSubmitRef.current = false;
    // Focus textarea after reset so user can start a new question immediately
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const submitQuestion = async (question: string, currentMessages?: Message[]) => {
    if (!question.trim() || isStreamingRef.current) return;
    isStreamingRef.current = true;

    const trimmed = question.trim();
    lastQuestionRef.current = trimmed;

    // Build conversation history from current messages state (completed exchanges only).
    // Use the snapshot passed in (for auto-submit path) or read from closure.
    // Strip sources from history — API only needs role + content.
    const historySnapshot = currentMessages ?? messages;
    const conversationHistory = historySnapshot
      .filter((m) => m.content !== "") // exclude empty streaming placeholders
      .map((m) => ({ role: m.role, content: m.content }));

    // Append the new user message to form the full messages array to send
    conversationHistory.push({ role: "user", content: trimmed });

    // Add user message + empty assistant placeholder to local state for UI display
    setMessages((prev) => [
      ...prev,
      { role: "user", content: trimmed },
      { role: "assistant", content: "" }, // placeholder while streaming
    ]);
    setInput("");
    setIsStreaming(true);
    setError(null);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      if (response.status === 429) {
        const retryAfter = parseInt(
          response.headers.get("Retry-After") ?? "60",
          10
        );
        // Remove empty assistant placeholder
        setMessages((prev) => prev.slice(0, -1));
        setError({ kind: "rate_limit", retryAfter });
        setIsStreaming(false);
        isStreamingRef.current = false;
        return;
      }

      if (response.status === 400) {
        const data = await response.json();
        setMessages((prev) => prev.slice(0, -1));
        setError({ kind: "unknown", message: data.error ?? "Invalid question." });
        setIsStreaming(false);
        isStreamingRef.current = false;
        return;
      }

      if (!response.ok) {
        let errorMessage = "Something went wrong. Please try again.";
        try {
          const data = await response.json();
          if (data.error) errorMessage = data.error;
        } catch {
          // Response wasn't JSON — genuine network/proxy issue
        }
        setMessages((prev) => prev.slice(0, -1));
        setError({ kind: "server", message: errorMessage });
        setIsStreaming(false);
        isStreamingRef.current = false;
        return;
      }

      // Consume streaming response (mobile Safari compatible)
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        // Update assistant message content progressively
        const currentText = fullText;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: currentText,
          };
          return updated;
        });
      }
      // Final flush
      fullText += decoder.decode();

      // Parse citations from end-of-response block
      let answerText = fullText;
      let sources: Source[] = [];

      if (fullText.includes(CITATIONS_DELIMITER)) {
        const [body, sourcesRaw] = fullText.split(CITATIONS_DELIMITER);
        answerText = body;
        sources = parseSources(sourcesRaw);
      }

      // Update final assistant message with parsed answer and sources
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: answerText,
          sources,
        };
        return updated;
      });
    } catch {
      setMessages((prev) => prev.slice(0, -1));
      setError({ kind: "network" });
    } finally {
      setIsStreaming(false);
      isStreamingRef.current = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitQuestion(input);
    }
  };

  const handleSuggestion = (q: string) => {
    setInput(q);
    submitQuestion(q);
  };

  const handleRetry = () => {
    submitQuestion(lastQuestionRef.current);
  };

  const hasMessages = messages.length > 0;

  return (
    <div
      className="flex flex-col flex-1 rounded-xl overflow-hidden"
      style={{
        border: "1px solid var(--color-border)",
        background: "var(--color-bg-primary)",
        minHeight: 0,
      }}
    >
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4" style={{ minHeight: 0 }}>
        {!hasMessages ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full py-12 text-center">
            <LensIcon size={48} animate={false} />
            <h2
              className="mt-4 text-xl font-semibold text-gradient-lens"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              Ask anything about Scripture
            </h2>
            <p
              className="mt-2 text-lg max-w-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Get historically-grounded answers from the Bible Lens knowledge
              base
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-lg">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestion(q)}
                  disabled={isStreaming}
                  className="px-4 py-2 rounded-full text-lg border transition-colors"
                  style={{
                    background: "var(--color-bg-elevated)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Message list with header bar containing clear button */
          <>
            {/* Conversation header bar — only visible when there are messages */}
            <div
              className="flex justify-end mb-3 pb-2"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <button
                onClick={clearConversation}
                disabled={isStreaming}
                className="flex items-center gap-1.5 text-base transition-colors disabled:opacity-40"
                style={{ color: "var(--color-text-muted)" }}
                aria-label="New conversation"
              >
                {/* Plus/circle-plus icon */}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                New conversation
              </button>
            </div>
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error banners */}
      {error && (
        <div className="px-4 pb-2">
          {error.kind === "rate_limit" && (
            <div
              className="rounded-xl px-4 py-3 text-lg"
              style={{
                background: "rgba(250, 204, 21, 0.08)",
                border: "1px solid rgba(250, 204, 21, 0.25)",
                color: "var(--color-gold-400)",
              }}
            >
              {retryCountdown > 0
                ? `You're asking questions faster than I can keep up — try again in ${retryCountdown} seconds.`
                : "Ready to answer your next question."}
            </div>
          )}
          {error.kind === "network" && (
            <div
              className="rounded-xl px-4 py-3 text-lg flex items-center justify-between gap-3"
              style={{
                background: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                color: "#f87171",
              }}
            >
              <span>Connection lost. Check your internet and try again.</span>
              <button
                onClick={handleRetry}
                className="shrink-0 px-3 py-1 rounded-lg text-base font-medium transition-colors"
                style={{
                  background: "rgba(239, 68, 68, 0.15)",
                  color: "#f87171",
                }}
              >
                Retry
              </button>
            </div>
          )}
          {error.kind === "server" && (
            <div
              className="rounded-xl px-4 py-3 text-lg flex items-center justify-between gap-3"
              style={{
                background: "rgba(250, 204, 21, 0.08)",
                border: "1px solid rgba(250, 204, 21, 0.25)",
                color: "var(--color-gold-400)",
              }}
            >
              <span>{error.message ?? "Something went wrong. Please try again."}</span>
              <button
                onClick={handleRetry}
                className="shrink-0 px-3 py-1 rounded-lg text-base font-medium transition-colors"
                style={{
                  background: "rgba(250, 204, 21, 0.15)",
                  color: "var(--color-gold-400)",
                }}
              >
                Retry
              </button>
            </div>
          )}
          {error.kind === "unknown" && (
            <div
              className="rounded-xl px-4 py-3 text-lg"
              style={{
                background: "var(--color-bg-elevated)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-muted)",
              }}
            >
              {error.message ?? "Something went wrong. Please try again."}
            </div>
          )}
        </div>
      )}

      {/* Input area */}
      <div
        className="px-4 pb-4 pt-2 shrink-0"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <div
          className="flex items-end gap-3 rounded-2xl px-4 py-3"
          style={{
            background: "var(--color-bg-elevated)",
            border: "1px solid var(--color-border)",
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            placeholder="Ask a theological question..."
            rows={1}
            className="flex-1 resize-none bg-transparent leading-6 placeholder-opacity-60"
            style={{
              color: "var(--color-text-primary)",
              fontSize: "16px", // prevents iOS zoom on focus
              maxHeight: "128px",
              overflowY: "auto",
            }}
          />
          <button
            onClick={() => submitQuestion(input)}
            disabled={!input.trim() || isStreaming}
            className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors disabled:opacity-40"
            style={{
              background: input.trim() && !isStreaming
                ? "var(--color-gold-400)"
                : "var(--color-bg-secondary)",
              color: input.trim() && !isStreaming
                ? "var(--color-bg-primary)"
                : "var(--color-text-muted)",
            }}
            aria-label="Send question"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
        <p
          className="text-base mt-2 text-center"
          style={{ color: "var(--color-text-muted)" }}
        >
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
