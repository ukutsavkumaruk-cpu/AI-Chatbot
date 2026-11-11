import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router"
import { logout } from '../features/auth/userAuthSlice'
import {postLogout} from './Services/authServices'
import {clearCurrentChat,setConversations,clearConversationId} from '../features/chat/chatSlice'


function Header({ onMenuClick ,}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(
    (state) => state.user.isLoggedIn 
  )
  async function handleLogout(){
    const islogout = await postLogout()
    if(islogout){

    dispatch(clearCurrentChat());
    dispatch(setConversations([]));
    dispatch(clearConversationId());
    localStorage.removeItem("conversationId");
    dispatch(logout());
    }

  }
  function getUserSignUp(){
    navigate('/signUp')
  }
  function getUserLogin(){
    navigate('/Login')
  }
  return (
    <header className="flex h-14 min-w-0 flex-1 shrink-0 items-center justify-between border-b border-(--border) bg-(--code-bg)/80 px-3 shadow-sm backdrop-blur-md sm:px-5">
      <div className="flex items-center gap-3">
        <button
          className="flex size-8 items-center justify-center rounded-lg text-(--text-h) transition hover:bg-(--code-bg) md:hidden"
          type="button"
          aria-label="Open conversation sidebar"
          onClick={onMenuClick}
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-4.5" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
        <a className="flex items-center gap-2.5 text-inherit no-underline md:hidden" href="#" aria-label="Chatie home">
          <span className="flex size-7 items-center justify-center rounded-lg bg-(--accent) text-xs font-bold text-white">
            C
          </span>
          <span className="text-base font-semibold tracking-tight text-(--text-h)">Chatie</span>
        </a>
      </div>

      <nav className="flex items-center gap-1.5" aria-label="Account actions">
        {isLoggedIn ? 
        <button
          className="rounded-lg px-2.5 py-1.5 text-sm font-semibold text-(--text-h) transition hover:bg-(--code-bg) sm:px-3"
          type="button" onClick={handleLogout}
        >
          Log out
        </button> :
        <button
          className="rounded-lg px-2.5 py-1.5 text-sm font-semibold text-(--text-h) transition hover:bg-(--code-bg) sm:px-3"
          type="button"  onClick={getUserLogin}
        >
          Log in
        </button>

        }
        {isLoggedIn ? '' :
        <button
          className="rounded-lg bg-(--accent) px-2.5 py-1.5 text-sm font-semibold text-white transition hover:opacity-90 sm:px-3"
          type="button" onClick={getUserSignUp}
        >
          Sign up
        </button> }
      </nav>
    </header>
  )
}

export default Header
