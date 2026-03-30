interface ArticleScriptureInsetProps {
  reference: string
  verses: Array<{ number: number; text: string }>
}

export function ArticleScriptureInset({ reference, verses }: ArticleScriptureInsetProps) {
  return (
    <blockquote
      className="w-full my-6 py-4 px-6 border-l-2 border-[#facc15]"
      style={{ backgroundColor: '#FBF9F4' }}
    >
      <span className="micro-label mb-2 block">Scripture</span>
      {verses.map((verse) => (
        <p
          key={verse.number}
          className="font-newsreader italic text-[18px] leading-[28px] pl-6 text-[#92400e]"
        >
          <span className="verse-number mr-1 not-italic">{verse.number}</span>
          {verse.text}
        </p>
      ))}
      <cite className="block mt-2 font-space-grotesk text-[11px] font-semibold tracking-wider uppercase text-[#a3a3a3] not-italic">
        {reference}
      </cite>
    </blockquote>
  )
}
