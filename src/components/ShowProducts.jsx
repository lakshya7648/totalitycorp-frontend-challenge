import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import { capitalize } from '../utils/index';

const ShowProducts = ({ category, limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL for fetching the products with limit furthur can be replaced with our own api
  const url = `https://dummyjson.com/products/category/${category}?limit=${limit}`;
  //function to fetch products with the set limit to show on homepage
  const fetchProducts = async () => {
    
    await fetch(url).then((response)=>response.json()).then((result)=>setProducts(result.products));

    setLoading(false);
    
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <>
      <div className="w-auto m-2 my-5 bg-white shadow-lg border rounded-sm flex justify-around p-5 overflow-x-scroll md:overflow-hidden flex-wrap">
        <div className="h-inherit py-2 border-none mx-4 flex flex-col justify-center items-center">
          <h1 className="text-3xl text-center w-40 md:text-3xl md:w-auto font-bold mb-5 md:mb-10 items-center">{capitalize(category)}</h1>
          <Link to={`products/category/${category}`} className="bg-blue-700 text-white font-semibold px-3 py-2 rounded-md shadow hover:bg-blue-800 active:bg-blue-600 hover:scale-110 hover:transition-transform">View All</Link>
        </div>
        <div className="mx-auto my-auto">
          {loading && <Spinner/>}
        </div>
        {products.length && products.map((product) => {
          return (

            <div key={product.title} className="m-2 bg-white dark:bg-gray-800 flex md:flex-col justify-center items-center">
              <Link to={`products/${product.id}`}>
                <img className="w-36 h-28" src={product.thumbnail} alt={product.title} />
              </Link>
              <div className="p-5 flex flex-col justify-center items-center">
                <Link to={`products/${product.id}`}>
                  <h5 className="mb-2 text-xl md:text-2xl md:w-48 text-center font-bold tracking-tight text-gray-900 dark:text-white">{capitalize(product.title)}</h5>
                </Link>
                <Link to={`products/${product.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:scale-110 hover:transition-transform">
                  View
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </Link>
              </div>
            </div>

          )
        })}
      </div>
    </>
  )
}

export default ShowProducts
