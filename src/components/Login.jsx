import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { verifyUser } from '../utils/index';
import { setUser, setAuthToken } from '../state/AuthUserSlicer/AuthUserSlicer';
import { useDispatch } from 'react-redux';

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const loginMe = ()=>{
    // Logic for login the user will go here and we'll recieve an authtoken which will be used for furthur authentication
    // ------------ Logic --------------------
    // ---------------------------------------

    // for a while adding a logic for verifying the user
    const email = document.getElementById("email").value;
    const pwd = document.getElementById("password").value;
    const result = verifyUser(email, pwd);
    const authToken = true;
    localStorage.setItem("user", JSON.stringify(result));
    localStorage.setItem("authToken", authToken);
    dispatch(setUser(result));
    dispatch(setAuthToken(authToken));
    nav("/");
  }

  useEffect(() => {
    document.title="Login to eShop";
    if(localStorage.getItem("authToken")){
      nav("/");
    }
  }, [])
  

  return (
    <>
      <div className="w-full max-w-sm p-4 bg-gray-200 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-10">
        <div className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          
          <button type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={loginMe}>Login to your account</button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login
