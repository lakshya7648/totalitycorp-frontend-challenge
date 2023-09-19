import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Categories from "./Categories";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser, setAuthToken } from "../state/AuthUserSlicer/AuthUserSlicer";


const Navbar = () => {
    const totalItems = useSelector(state => state.carts.totalItems);
    const authUser = useSelector(state => state.authUser.user);
    const authToken = useSelector(state=>state.authUser.authToken);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();


    const handleSearch = () => {
        nav({
            pathname: '/products/search',
            search: `?q=${document.getElementById("simple-search").value}`,
          });
    }

    const logMeOut = (e)=>{
        e.preventDefault();
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        dispatch(setUser(null));
        dispatch(setAuthToken(false));
    }

    return (
        <>
            <nav className="bg-blue-700 z-40 dark:bg-gray-900 sticky w-full top-0 left-0 border-b border-white dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center">
                        <span className="text-white self-center italic text-3xl font-bold whitespace-nowrap dark:text-white">eShop</span>
                    </Link>
                    <div className="flex md:order-2">
                        {!authToken && <Link to="/login" className="text-black md:mx-2 bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-3 text-center mr-3 md:mr-0 dark:bg-yellow-300 dark:hover:bg-yellow-400 dark:focus:ring-yellowbg-yellow-300">Login</Link>}
                        {!authToken && <Link to="/signup" className="text-black md:mx-2 bg-white hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-4 py-3 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-black dark:hover:text-white dark:focus:ring-yellowbg-white">SignUp</Link>}

                        {authToken && <div className="flex justify-between">
                            <span className="text-lg text-white font-semibold px-3 py-2 ">{authUser.name}</span>
                            <img className="w-10 h-10 rounded-full border border-white" src={authUser.photo} alt="Rounded avatar"/>
                            <button type="button" className="ml-2 bg-red-500 text-white px-3 py-2" onClick={logMeOut}>Logout</button>
                        </div>}

                        <Link to="/cart" className="relative inline-flex mr-5 items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:outline-none active:bg-black">
                            <svg className="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
                            </svg>
                            <span className="sr-only">Notifications</span>
                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{totalItems}</div>
                        </Link>


                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 bg-white justify-center text-sm text-blue-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-[600px] md:order-1" id="navbar-sticky">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" className="bg-white  text-gray-900 text-sm rounded-3xl focus:ring-white focus:border-white block w-full pl-10 p-3  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search your products, brand and more ..." required />
                        </div>
                        <button type="button" className="flex justify-between space-x-2 p-2.5 px-4 ml-2 transition-all text-sm font-medium text-black bg-white rounded-3xl hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-white dark:bg-blue-600 dark:hover:bg-white dark:focus:ring-blue-800" onClick={handleSearch}>
                            <svg className="w-4 h-4 my-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                            <p className="text-[20px]">Search</p>
                        </button>

                    </div>
                </div>
                {/* Categories component is used with the navbar so that user can anytime visit any category */}
                <Categories />
            </nav>

        </>
    );
}

export default Navbar;