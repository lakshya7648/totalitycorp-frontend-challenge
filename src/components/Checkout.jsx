import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFromCheckout } from '../state/CheckoutSlicer/CheckoutSlicer';

const Checkout = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const checkoutData = useSelector(state => state.checkout);
    const [orderBooked, setOrderBooked] = useState(false);
    const finalizeOrder= ()=>{
        // --------- Logic for finalizing the order, saving the data in database and sending info to payment gateway ------
        // goes here
        // ----------------------------------------------------------------------------------------------------------------
        // After that
        setOrderBooked(true);
        // dispatch(removeFromCheckout());
    }

    useEffect(() => {
        document.title="Final Checkout";
        if (!localStorage.getItem("authToken")) {
            nav("/login");
        }
        if(localStorage.getItem("authToken") && checkoutData.items.length === 0){
            nav("/cart");
        }
    }, [])

    return (
        <>
            {!orderBooked && <div className="w-3/4 p-3 my-2 mx-auto">
                <div className="items_view bg-white shadow-lg p-2 my-2 border">
                    <h1 className="text-xl md:text-2xl font-bold p-2 py-3 text-gray-900">
                        Item Details
                    </h1>

                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product Image
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkoutData.items.map((element) => {
                                    return (<tr key={element.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <img src={element.product.thumbnail} crossOrigin="" alt={element.product.title} className="w-8 h-8 md:w-12 md:h-12 rounded-full border" />
                                        </td>
                                        <th className="px-6 py-4">
                                            {element.product.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            {element.quantity}
                                        </td>
                                        <td className="px-6 py-4">
                                            ${element.product.price}
                                        </td>
                                    </tr>)
                                })}

                            </tbody>
                        </table>
                    </div>

                    <hr className="h-px w-full my-8 bg-gray-400 border-0 dark:bg-gray-700" />
                    <div className="flex justify-between space-x-2 space-y-2">
                        <h1 className="text-lg md:text-xl font-semibold p-2">Total </h1>
                        <span className="text-lg md:text-xl font-semibold p-2">${checkoutData.totalPrice}</span>
                    </div>
                </div>
                <div className="items_view bg-white shadow-lg p-2 my-2 border">
                    <h1 className="text-xl md:text-2xl font-bold p-2 py-3 text-gray-900">
                        Shipping Details
                    </h1>
                    <div className="user_info p-4 flex flex-col justify-between space-y-2">
                        <span className='text-center text-xl font-bold'>Fill out shipping details</span>
                        <div className="mb-6">
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                            <input type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="abc@xyz.com" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
                            <input type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxx-xxx-xxxx" required />
                        </div>
                        <span className='mb-2 text-center font-bold'>Address Details</span>
                        <div className="mb-6">
                            <label htmlFor="addess" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Address</label>
                            <textarea id="addess" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a Address"></textarea>
                        </div>
                    </div>
                </div>
                <div className="items_view bg-white shadow-lg p-2 my-2 border">
                    <h1 className="text-xl md:text-2xl font-bold p-2 py-3 text-gray-900">
                        Payment Information
                    </h1>
                    <div className="user_info p-4 flex flex-col justify-between space-y-2">
                        <span className='text-center text-xl font-bold'>Fill out Debit Card Details</span>
                        <div className="mb-6">
                            <label htmlFor="cardno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Card Number</label>
                            <input type="text" id="cardno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                        </div>
                        <div className="flex p-4 my-3">
                            <div className="mb-3">
                                <label htmlFor="expiry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiry</label>
                                <input type="month" id="expiry" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="YYYY-MM" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="CVV" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CVV</label>
                                <input type="number" id="CVV" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="YYYY-MM" max={3} required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name on card</label>
                            <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name on card" required />
                        </div>
                    </div>
                    <div className="flex justify-center p-2">
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={finalizeOrder}>Submit</button>
                    </div>
                </div>
                
            </div>}
            {orderBooked && 
        <div className="w-4/5 mx-auto p-10 bg-white">
          <img src="/images/6110040.webp" alt="empty cart" className="w-1/4 mx-auto my-2" />
          <h1 className="text-center text-2xl md:text-4xl font-semibold mb-1">Order Placed Successfully</h1>
          <p className="font-light text-xl md:text-2xl text-center mb-3">Shortly, item will be delivered to the address provided</p>
        </div>}
        </>
    )
}

export default Checkout
