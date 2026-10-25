function Sidebar({ conversations = [], isOpen = false, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          type="button"
          aria-label="Close conversation sidebar"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(84vw,280px)] flex-col border-r border-[var(--border)] bg-[var(--code-bg)] p-3 transition-transform duration-200 md:static md:z-auto md:h-[100svh] md:w-[260px] md:shrink-0 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Conversation sidebar"
      >
        <div className="mb-5 flex items-center justify-between px-1">
          <a className="flex items-center gap-2.5 text-inherit no-underline" href="#" aria-label="Chatie home">
            <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-bold text-white">
              C
            </span>
            <span className="text-base font-semibold tracking-tight text-[var(--text-h)]">Chatie</span>
          </a>
          <button
            className="flex size-9 items-center justify-center rounded-lg text-[var(--text)] transition hover:bg-[var(--bg)] hover:text-[var(--text-h)] md:hidden"
            type="button"
            aria-label="Close conversation sidebar"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <button
          className="mb-5 flex w-full items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 text-left text-sm font-medium text-[var(--text-h)] transition hover:border-[var(--accent)]"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-[18px] text-[var(--accent)]" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          New chat
        </button>

        <div className="mb-2 px-2 text-xs font-semibold text-[var(--text)]">
          Recent conversations
        </div>
        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto" aria-label="Past conversations">
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <button
                className="w-full truncate rounded-lg px-3 py-2 text-left text-sm text-[var(--text-h)] transition hover:bg-[var(--bg)]"
                key={conversation.id}
                type="button"
              >
                {conversation.title}
              </button>
            ))
          ) : (
            <p className="px-2 py-3 text-xs leading-relaxed text-[var(--text)]">
              Your conversations will appear here.
            </p>
          )}
        </nav>

        <div className="mt-3 border-t border-[var(--border)] pt-3">
          <button
            className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-[var(--bg)]"
            type="button"
            aria-label="User account"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-bg)] text-[var(--accent)]">
              <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <circle cx="12" cy="8" r="3.25" />
                <path d="M5.5 20c.6-3.2 2.8-5 6.5-5s5.9 1.8 6.5 5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--text-h)]">Your account</span>
            <svg viewBox="0 0 24 24" fill="none" className="size-4 text-[var(--text)]" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
