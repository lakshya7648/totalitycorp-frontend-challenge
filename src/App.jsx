import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Error404 from "./components/Error404"
import Navbar from "./components/Navbar"
import Categories from "./components/Categories"
import ProductsListing from "./components/ProductsListing"
import ProductView from "./components/ProductView"
import { useEffect, useState } from "react"
import Toasts from "./components/Toasts"
import Carts from "./components/Carts"
import { initFlowbite } from "flowbite";
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Checkout from "./components/Checkout"



function App() {
  const [visible, setVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const setToasts = (message) =>{
    setVisible(true);
    setToastMessage(message);

    setTimeout(()=>{
      setVisible(false);
      setToastMessage('');
    }, 5000)
  }

  useEffect(() => {
    initFlowbite();
  }, [])
  


  return (
    <>
      <Router>
        <Navbar/>
        <Toasts visible={visible} message={toastMessage}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products/search" element={<ProductsListing />} />
          <Route path="/products/category/:category" element={<ProductsListing/>} />
          <Route path="/products/:id" element={<ProductView setToasts={setToasts}/>}/>
          <Route path="/cart" element={<Carts setToasts={setToasts}/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/checkout" element={<Checkout />}/>
          <Route path="*" element={<Error404/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
