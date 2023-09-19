import React, { useEffect, useState } from 'react'
import {initFlowbite} from 'flowbite';
import Spinner from './Spinner';

const ProductImageView = ({ images, thumbnail }) => {
    const [show, setShow] = useState(false);
    // console.log(document.querySelectorAll("[data-carousel-item]"))
    useEffect(() => {
        if (images) {
            setShow(true);
            initFlowbite();
        } else {
            setShow(false);
        }
    }, [images])

    let count = 0;
    return (
        <>
            {show ? <div id="indicators-carousel" className="relative w-full" data-carousel="static">

                <div className="relative h-80 overflow-hidden rounded-lg md:h-96">
                    <div className="hidden duration-700 ease-in-out" data-carousel-item={"active"}>
                        <img src={thumbnail} className="w-auto h-auto absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                    </div>
                    {show ? images.map((image) => {
                        return (
                            <div key={image} className="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src={image} crossOrigin='' className="w-auto h-auto absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                            </div>
                        );
                    }) : <Spinner />}
                </div>

                <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                    {show ? images.map((image) => {
                        return (
                            <button key={image} type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label={`Slide ${count + 1}`} data-carousel-slide-to={`${count++}`}></button>
                        );
                    }) : <Spinner />}
                </div>

                <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/30 dark:bg-gray-800/30 group-hover:bg-blue-500/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-blue-500 dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-blue-500  dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/30 dark:bg-gray-800/30 group-hover:bg-blue-500/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-blue-500 dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-blue-500 dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div> : <Spinner />}

        </>
    )
}

export default ProductImageView
