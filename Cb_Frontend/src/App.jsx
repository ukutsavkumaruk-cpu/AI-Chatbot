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
    <div className="flex min-h-svh w-full bg-(--bg)">
      <Sidebar
        conversations={conversations}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <Header onMenuClick={() => setIsSidebarOpen(true)}  />
        <Home />
      
    </div>
    </>
  )
}

export default App
