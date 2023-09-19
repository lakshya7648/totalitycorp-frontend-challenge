import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner';
import ProductImageView from './ProductImageView';
import Ratings from './Ratings';
import { addToCart } from '../state/CartSlicer/CartSlicer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductView = ({ setToasts }) => {
  // using the product id we can extract the requested element information
  // this furthur can be removed with our own api.
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();


  // logic to fetch the product details
  const fetchProductDetails = async () => {
    // URL is based on dummyapi i have used while it can be replaced and modified furthur
    const url = `https://dummyjson.com/products/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    setProduct(result);
    setLoading(false);
  }
  // console.log(product.images);

  const addItemToCart = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    const newItem = {
      product:product,
      quantity:1,
    }
    dispatch(addToCart(newItem));
    setToasts(`Item ${product.title} added to cart successfully`);
  }

  const buyOut = ()=>{
    if(!localStorage.getItem("authToken")){
      nav("/login");
    } else {
      // to be added
    }
  }

  // function for checking if the item selected already exists in the cart or not
  const checkExists = ()=>{
    let ifExists = false;
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart")); 
      if(cart.totalItems !== 0){
        cart.items.forEach((element) => {
          if (element.product.id === product.id) {
            ifExists =  true;
          }
        })
      }
    }
    return ifExists;
  }

  useEffect(() => {
    fetchProductDetails();
  }, [])


  return (
    <>
      <div className="container mb-16 mx-auto overflow-auto">
        {loading && <Spinner />}
        <ProductImageView images={product.images} thumbnail={product.thumbnail} />
        <div className='p-2'>
          <div className="flex">
            <div className="self-start">
              <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900">{product.title}</h1>
              <Ratings total={product.rating} />
              <h4 className="text-xl md:text-2xl font-bold">${product.price}</h4>
            </div>
            <div className="self-end">
              {/* badges to be added */}
            </div>
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <h3 className="text-2xl md:text-3xl text-gray-900">Description</h3>
          <p className="text-lg md:text-xl text-gray-800 p-2 ">{product.description}</p>
        </div>
      </div>
      <div className='fixed top-auto bottom-0 p-2 w-full bg-white border border-t flex justify-center space-x-3'>
        <button type="button" className="bg-blue-500 md:text-2xl text-white font-semibold px-3 py-2 hover:bg-blue-600" onClick={buyOut}>Buy Now</button>
        <button disabled = {(localStorage.getItem('cart'))?checkExists():false} type="button" id="addCartBtn" className="bg-yellow-300 disabled:bg-yellow-100 md:text-2xl px-3 py-2 font-semibold text-black hover:bg-yellow-400" onClick={addItemToCart}>Add to Cart</button>
      </div>
    </>
  )
}

export default ProductView
