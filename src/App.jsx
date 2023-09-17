import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Error404 from "./components/Error404"
import Navbar from "./components/Navbar"
import Categories from "./components/Categories"
import ProductsListing from "./components/ProductsListing"
import ProductView from "./components/ProductView"
function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products/category/:category" element={<ProductsListing/>} />
          <Route path="/products/:id" element={<ProductView/>}/>
          <Route path="*" element={<Error404/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
