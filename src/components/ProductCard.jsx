import React from 'react'
import Ratings from './Ratings'
import { Link } from 'react-router-dom'

const ProductCard = ({id, thumbnail, title, ratings, price}) => {
    return (
        <>
            <div className="w-64 max-w-sm bg-white hover:border hover:border-gray-200 rounded-lg hover:shadow hover:dark:bg-gray-800 hover:dark:border-gray-700 md:hover:transition-transform md:hover:scale-105">
                <Link to={`/products/${id}`}>
                    <img className="w-72 mx-auto p-4 rounded-t-lg" src={thumbnail} alt={title}/>
                </Link>
                <div className="px-5 pb-5">
                    <Link to={`/products/${id}`}>
                        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-blue-600">{title}</h5>
                    </Link>
                    <Ratings total={ratings}/>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">${price}</span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductCard
