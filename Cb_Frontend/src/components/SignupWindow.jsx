import { useNavigate } from "react-router"


function SignupWindow() {

const navigate = useNavigate();
 
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/45 p-4 backdrop-blur-sm">
      <section
        aria-labelledby="signup-title"
        aria-modal="true"
        className="my-auto w-full max-w-md rounded-3xl border border-(--border) bg-(--bg) p-6 shadow-2xl sm:p-8"
        role="dialog"
      >
        <div className="mb-7">
          <div className="mb-5 flex items-center justify-between">
            <span className="flex size-10 items-center justify-center rounded-xl bg-(--accent) text-lg font-bold text-white">
              C
            </span>
            <button
              aria-label="Close sign up window"
              className="flex size-9 items-center justify-center rounded-full text-(--text) transition hover:bg-(--code-bg) hover:text-(--text-h)"
              type="button" onClick={()=>{navigate(-1)}}
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="m18 6-12 12M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <h2 id="signup-title" className="mb-2 text-2xl font-semibold tracking-tight text-(--text-h)">
            Create your account
          </h2>
          <p className="text-sm text-(--text)">
            Sign up to get started with Chatie.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-(--text-h)" htmlFor="signup-name">
              Full name
            </label>
            <input
              autoComplete="name"
              className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-sm text-(--text-h) outline-none transition placeholder:text-(--text) focus:border-(--accent) focus:ring-3 focus:ring-(--accent-bg)"
              id="signup-name"
              name="name"
              placeholder="Your name"
              type="text"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-(--text-h)" htmlFor="signup-email">
              Email address
            </label>
            <input
              autoComplete="email"
              className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-sm text-(--text-h) outline-none transition placeholder:text-(--text) focus:border-(--accent) focus:ring-3 focus:ring-(--accent-bg)"
              id="signup-email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-(--text-h)" htmlFor="signup-password">
              Password
            </label>
            <input
              autoComplete="new-password"
              className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-sm text-(--text-h) outline-none transition placeholder:text-(--text) focus:border-(--accent) focus:ring-3 focus:ring-(--accent-bg)"
              id="signup-password"
              name="password"
              placeholder="Create a password"
              type="password"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-(--text-h)" htmlFor="signup-confirm-password">
              Confirm password
            </label>
            <input
              autoComplete="new-password"
              className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-sm text-(--text-h) outline-none transition placeholder:text-(--text) focus:border-(--accent) focus:ring-3 focus:ring-(--accent-bg)"
              id="signup-confirm-password"
              name="confirmPassword"
              placeholder="Enter your password again"
              type="password"
            />
          </div>

          <button
            className="w-full rounded-xl bg-(--accent) px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
            type="button" 
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-relaxed text-(--text)">
          By creating an account, you agree to our terms of service and privacy policy.
        </p>
      </section>
    </div>
  )
}

export default SignupWindow
