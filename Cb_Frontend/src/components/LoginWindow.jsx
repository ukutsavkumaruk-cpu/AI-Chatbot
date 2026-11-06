import { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import { postLogin } from "./Services/authServices";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from '../features/auth/userAuthSlice'

function LoginSuccessPopup() {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
      <section
        aria-live="polite"
        className="w-full max-w-sm rounded-3xl border border-(--border) bg-(--bg) p-8 text-center shadow-2xl"
        role="status"
      >
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
          <FaCheck className="text-2xl text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold text-(--text-h)">
          Login successful!
        </h2>
        <p className="text-sm text-(--text)">Welcome back to Chatie.</p>
      </section>
    </div>
  );
}

function LoginWindow() {

const dispatch = useDispatch();
const navigate = useNavigate();
const [showSuccess, setShowSuccess] = useState(false);

useEffect(() => {
  if (!showSuccess) return;

  const timeoutId = setTimeout(() => {
    navigate("/", { replace: true });
  }, 1000);

  return () => clearTimeout(timeoutId);
}, [showSuccess, navigate]);

async function handleLogin(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const email = formData.get("email");
  const password = formData.get("password");

  const userData = {
    email,
    password
  };

  const response = await postLogin(userData);

  console.log("This is loggedIn user :", response)

  if(response.isLoggedIn){
    setShowSuccess(true);
    dispatch(login());
  }
}

  return (
    <>
    {showSuccess && <LoginSuccessPopup />}
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/45 p-4 backdrop-blur-sm">
      <section
        aria-labelledby="login-title"
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
              aria-label="Close login window"
              className="flex size-9 items-center justify-center rounded-full text-(--text) transition hover:bg-(--code-bg) hover:text-(--text-h)"
              type="button" 
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="m18 6-12 12M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <h2 id="login-title" className="mb-2 text-2xl font-semibold tracking-tight text-(--text-h)">
            Welcome back
          </h2>
          <p className="text-sm text-(--text)">
            Log in to continue to Chatie.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-(--text-h)" htmlFor="login-email">
              Email address
            </label>
            <input
              autoComplete="email"
              className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-sm text-(--text-h) outline-none transition placeholder:text-(--text) focus:border-(--accent) focus:ring-3 focus:ring-(--accent-bg)"
              id="login-email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-(--text-h)" htmlFor="login-password">
              Password
            </label>
            <input
              autoComplete="current-password"
              className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-sm text-(--text-h) outline-none transition placeholder:text-(--text) focus:border-(--accent) focus:ring-3 focus:ring-(--accent-bg)"
              id="login-password"
              name="password"
              placeholder="Enter your password"
              type="password"
            />
          </div>

          <button
            className="w-full rounded-xl bg-(--accent) px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
            type="submit" 
          >
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-(--text)">
          Welcome back to Chatie.
        </p>
      </section>
    </div>
    </>
  )
}

export default LoginWindow
