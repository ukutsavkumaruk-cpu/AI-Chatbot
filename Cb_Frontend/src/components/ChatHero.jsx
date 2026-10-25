function ChatHero() {
  return (
    <section className="mx-auto my-auto w-full max-w-3xl px-2 text-center">
      <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl bg-(--accent-bg) text-(--accent)">
        <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M12 3.5 13.9 9l5.6 2-5.6 2-1.9 5.5L10 13l-5.5-2L10 9l2-5.5Z" strokeLinejoin="round" />
          <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-(--accent)">
        Your AI assistant
      </p>
      <h1 className="m-0 text-[clamp(30px,5vw,46px)] font-semibold leading-tight tracking-tighter text-(--text-h)">
        What can I help with?
      </h1>
    </section>
  )
}

export default ChatHero
