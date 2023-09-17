import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner';
import ProductImageView from './ProductImageView';
import Ratings from './Ratings';

const ProductView = () => {
  // using the product id we can extract the requested element information
  // this furthur can be removed with our own api.
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);


  // logic to fetch the product details
  const fetchProductDetails = async () => {
    // URL is based on dummyapi i have used while it can be replaced and modified furthur
    const url = `https://dummyjson.com/products/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    setProduct(result);
    setLoading(false);
  }
  console.log(product.images);

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
          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <h3 className="text-2xl md:text-3xl text-gray-900">Description</h3>
          <p className="text-lg md:text-xl text-gray-800 p-2 ">{product.description}</p>
        </div>
      </div>
      <div className='fixed top-auto bottom-0 p-2 w-full bg-white border border-t flex justify-center space-x-3'>
        <button type="button" className="bg-blue-500 md:text-2xl text-white font-semibold px-3 py-2 hover:bg-blue-600">Buy Now</button>
        <button type="button" className="bg-yellow-300 md:text-2xl px-3 py-2 font-semibold text-black hover:bg-yellow-400 ">Add to Cart</button>
      </div>
    </>
  )
}

export default ProductView
