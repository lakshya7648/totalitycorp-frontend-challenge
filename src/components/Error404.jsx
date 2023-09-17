import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Error404() {
  const nav = useNavigate();
  useEffect(() => {
    document.title = "Oops... Page Not Found"
  }, [])
  
  const goBackToHome = ()=>{
    nav("/");
  }
  return (
    <div className="container flex flex-col justify-center items-center">
        <img src="./src/assets/images/error-500.png" alt="404 Not Found" className="h-96" />
        <button className="px-3 py-2 w-60 my-10 bg-gradient-to-r from-blue-400 via blue-500 via blue-600 via blue-700 to-blue-800 text-white rounded-3xl font-semibold text-2xl hover:bg-gradient-to-r hover:from-blue-800 hover:via blue-700 hover:via blue-600 hover:via blue-500 hover:to-blue-400 active:bg-gradient-to-b active:from-blue-700 active:via blue-600 active:via blue-500 active:to-blue-400 transition-colors ease-in-out" onClick={goBackToHome}>Go to home</button>
    </div>
  )
}

export default Error404
