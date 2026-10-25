import { useState,useEffect  } from 'react'
import { Routes, Route } from "react-router";
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import SignupWindow from './components/SignupWindow'
import LoginWindow from './components/LoginWindow'
import Home from './components/Home';


function App({ conversations = [] }) {

  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)


  
  // function handleUserSignUp(){
    
  // }
  // function getUserSignup(){

  // }



  return (
    <>
    <Routes>
      {/* <Route path="/home" element={<App />} /> */}
      <Route path="/signUp" element={<SignupWindow/>} />
      <Route path="/login" element={<LoginWindow/>} />
    </Routes>
    <div className="flex h-svh w-full overflow-hidden bg-(--bg)">
      <Sidebar
        conversations={conversations}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col md:ml-[260px]">
        <div className="sticky top-0 z-10 shrink-0">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">
          <Home />
        </div>
      </div>
    </div>
    </>
  )
}

export default App
