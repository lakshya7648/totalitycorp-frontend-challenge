import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Ratings from "./Ratings";
import { increaseQuantity, decreaseQuantity, removeFromCart, moveToCheckout } from "../state/CartSlicer/CartSlicer";
import { addForCheckout } from "../state/CheckoutSlicer/CheckoutSlicer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Carts = ({ setToasts }) => {
  const cart = useSelector(state => state.carts);
  const authToken = useSelector(state=>state.authUser.authToken);
  const dispatch = useDispatch();
  const nav = useNavigate();
  
  const incQuantity = (e, id, quantity, stock) => {
    
    e.preventDefault();
    if((quantity + 1) > 1) {
      
      e.target.previousSibling.previousSibling.removeAttribute("disabled");
    }
    if (quantity <= stock) {
      dispatch(increaseQuantity({ id: Number(id) }));
    } else {
      e.target.disabled = true;
    }
  }

  const decQuantity = (e, id, quantity, stock) => {
    
    e.preventDefault();
    if((quantity - 1) <= stock){
      e.target.nextSibling.nextSibling.removeAttribute("disabled");
    }
    if (quantity > 1) {
      dispatch(decreaseQuantity({ id: Number(id) }));
    } else {
      e.target.disabled = true;
    }
  }

  const removeItemFromCart = (e, id, title)=>{
    dispatch(removeFromCart(id));
    setToasts(`Item ${title} removed from your cart`);
  }

  const buyOut = ()=>{
    if(authToken){
      cart.items.forEach((element)=>{
        dispatch(addForCheckout(element));
        dispatch(moveToCheckout());
      });
      nav('/checkout');
    } else {
      nav("/login");
    }
  }

  useEffect(() => {
    document.title = 'Carts - eShop : Platform to buy your favorites';
  }, [])
  
  
  return (
    <>
      {cart.totalItems !== 0 && <div className="w-full p-2 bg-gray-300 flex  space-x-2 justify-between flex-wrap">
          <div className="cart-view p-2 md:w-3/4 bg-white">
            <ul className="list-none p-2 flex flex-col flex-wrap">
              <li></li>
              {cart.items.map((element) => {
                return (
                  <li key={element.product.id} className="flex flex-wrap"><div className="flex flex-wrap justify-start items-center space-x-10 space-y-2">
                    <img src={element.product.thumbnail} alt={element.product.title} className="w-56 m-2 mx-auto" />
                    <div className="flex flex-col">
                      <h1 className="font-bold text-gray-900 text-2xl">{element.product.title}</h1>
                      <p className="text-[14px] font-light text-gray-400">{element.product.description}</p>
                      <Ratings total={element.product.rating} />
                      <h3 className="font-semibold text-gray-800 text-xl">${element.product.price}</h3>
                      <div className="flex w-full space-x-2 my-5 py-2 justify-start">
                        <button type="button" id="dbtn" className="w-8 h-8 rounded-full border border-blue-600 text-blue-600 bg-white" onClick={(e) => { e.preventDefault();decQuantity(e, element.product.id, element.quantity, element.product.stock) }}>-</button>
                        < input id="quantityView" readOnly className="p-1 w-8 h-8 text-center text-black font-light text-sm border" value={`${element.quantity}`} />
                        <button type="button" id="ibtn" className="w-8 h-8 rounded-full border border-blue-600 text-blue-600 bg-white" onClick={(e) => { e.preventDefault();incQuantity(e, element.product.id, element.quantity, element.product.stock) }}>+</button>
                        <button type="button" className="self-end bg-white border ml-5 border-gray-700 text-gray-700 hover:bg-black hover:text-white font-normal text-lg px-5 py-2" onClick={(e) => { removeItemFromCart(e, element.product.id, element.product.title) }}>Remove</button>
                      </div>
                    </div>
                  </div>
                    {cart.totalItems !== 1 && <hr className="h-px w-full my-8 bg-gray-400 border-0 dark:bg-gray-700" />}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="md:fixed md:right-2 cart-total w-full md:w-80 my-2 md:my-0 p-2 bg-white">
            <h1 className="text-2xl p-2 text-gray-700 font-semibold text-start">Price Details</h1>
            <hr className="h-[2px] my-2 bg-gray-700 border-0 dark:bg-gray-700" />
            <div className="grid grid-cols-2 gap-2 pb-5">
              <h1 className="text-lg px-2 py-2 font-normal">Price ({cart.totalItems} items)</h1>
              <h2 className="text-lg text-end px-2 py-2 font-normal">${cart.totalPrice}</h2>
            </div>
            <hr className="h-[2px] my-2 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="grid grid-cols-2 gap-2 mb-5">
              <h1 className="text-lg px-2 py-2 font-semibold">Total ({cart.totalItems} items)</h1>
              <h2 className="text-lg text-end px-2 py-2 font-semibold">${cart.totalPrice}</h2>
            </div>
            <div className="my-2">
              <button type="button" onClick={buyOut} className="bg-blue-700 text-white font-semibold text-xl rounded-3xl w-full text-center px-3 py-2">Buy Now</button>
            </div>
          </div>
        </div>
      }
      {cart.items.length === 0 && <div className="bg-gray-300 w-full h-[500px] p-2 shadow-md border">
        <div className="w-4/5 mx-auto p-10 bg-white">
          <img src="/images/emptyCart.png" alt="empty cart" className="w-1/4 mx-auto my-2" />
          <h1 className="text-center text-2xl md:text-4xl font-semibold mb-1">{authToken?"Cart is Empty":"Cart is missing?"}</h1>
          {!authToken && <p className="font-light text-xl md:text-2xl text-center mb-3">Looks Like the items you added are missing. Don't Worry do a login and again add</p>}
          {authToken && <p className="font-light text-xl md:text-2xl text-center mb-3">Sorry! Nothing is in your carts</p>}
          <div className="flex justify-center">
            {!authToken && <button className="bg-blue-600 text-white shadow-md transition ease-in-out hover:bg-blue-500 active:bg-blue-700 text-xl md:text-2xl font-semibold px-6 py-2" onClick={()=>{nav("/login");}}>Login</button>}
          </div>
        </div>
      </div>}
    </>
  )
}

export default Carts
