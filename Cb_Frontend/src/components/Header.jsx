import react from "react"
import { useNavigate } from "react-router"

function Header({ onMenuClick ,}) {
  const navigate = useNavigate();
  function getUserSignUp(){
    navigate('/signUp')
  }
  function getUserLogin(){
    navigate('/Login')
  }
  return (
    <header className="flex h-17 min-w-0 flex-1 shrink-0 items-center justify-between border-b border-(--border) px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          className="flex size-9 items-center justify-center rounded-lg text-[var(--text-h)] transition hover:bg-[var(--code-bg)] md:hidden"
          type="button"
          aria-label="Open conversation sidebar"
          onClick={onMenuClick}
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
        <a className="flex items-center gap-2.5 text-inherit no-underline md:hidden" href="#" aria-label="Chatie home">
          <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-bold text-white">
            C
          </span>
          <span className="text-base font-semibold tracking-tight text-[var(--text-h)]">Chatie</span>
        </a>
        <span className="hidden text-sm font-medium text-[var(--text-h)] md:block">New chat</span>
      </div>

      <nav className="flex items-center gap-2" aria-label="Account actions">
        <button
          className="rounded-lg px-3 py-2 text-sm font-semibold text-(--text-h) transition hover:bg-(--code-bg) sm:px-4"
          type="button"  onClick={getUserLogin}
        >
          Log in
        </button>
        <button
          className="rounded-lg bg-(--accent) px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90 sm:px-4"
          type="button" onClick={getUserSignUp}
        >
          Sign up
        </button>
      </nav>
    </header>
  )
}

export default Header
