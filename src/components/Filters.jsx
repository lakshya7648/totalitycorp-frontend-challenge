import { useEffect, useState } from "react";
import { capitalize } from "../utils/index";

const Filters = ({ products, setProducts, setFilteredProducts, productCateg }) => {
    
    // setting states for different kind of filters.
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [selValue, setSelValue] = useState("");
    const [categ, setCateg] = useState("");
    const [catgs, setCatgs] = useState([]);
    
    // function for filtering the values and storing it into the filteredProducts received as a props.
    const applyFilters = (min = 0, max = 0, selectValue = "", category="")=>{
        const filteredProducts = products.filter((element) => {
            if (min === 0 && max === 0){
                if(selectValue === "" && category !== ""){
                    return element.brand.toLowerCase() === category;
                } else if(selectValue !== "" && category === ""){
                    return (element.rating) >= Number(selectValue);
                } else if(selectValue !== "" && category !== "") {
                    return (element.rating) >= Number(selectValue) && element.brand.toLowerCase() === category;
                } else {
                    return element;
                }
            }
            else if (min === 2000 && max === 0){
                if(selectValue === "" && category !== ""){
                    return element.price >= 2000 && element.brand.toLowerCase() === category;
                } else if(selectValue !== "" && category === ""){
                    return element.price >= 2000 && (element.rating) >= Number(selectValue);
                } else if(selectValue !== "" && category !== "") {
                    return element.price >= 2000 && (element.rating) >= Number(selectValue) && element.brand.toLowerCase() === category;
                } else {
                    return element.price >= 2000;
                }
            }
            else{
                if(selectValue === "" && category !== ""){
                    return element.price >= min && element.price <= max && element.brand.toLowerCase() === category;
                } else if(selectValue !== "" && category === ""){
                    return element.price >= min && element.price <= max && (element.rating) >= Number(selectValue);
                } else if(selectValue !== "" && category !== "") {
                    return element.price >= min && element.price <= max && (element.rating) >= Number(selectValue) && element.brand.toLowerCase() === category;
                } else {
                    return element.price >= min && element.price <= max;
                }
            }
        })
        setFilteredProducts(filteredProducts);
    }

    // handling the price filter between minimum and maximum range
    const handlePriceFilter = (e) => {
        const mn = Number(e.target.min);
        const mx = Number(e.target.max);
        setMin(mn);
        setMax(mx);
        applyFilters(mn, mx, selValue, categ)
    }

    // handling the ratings filter
    const handleRatingsFilter = (e)=>{
        const rating = e.target.value;
        setSelValue(rating);
        applyFilters(min, max, rating, categ)
    }

    // handling the brand filter
    const handleBrandFilter = (e)=>{
        const brand = e.target.value;
        setCateg(brand);
        applyFilters(min, max, selValue, brand);
    }

    useEffect(() => {
      let c = new Set();
      products.forEach((element)=>{c.add(element.brand)});
      setCatgs(Array.from(c));


      // setting all the filters to their original location while navigating between different categories
      document.getElementById("default-radio-2").checked=true;
      document.getElementById("brand").selected=true;
      document.getElementById("rating").selected=true;
    }, [products, productCateg])
        
    return (
        <>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="fixed top-auto left-0 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <label htmlFor="categories" className="block mb-5 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                    <select id="categories" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleBrandFilter}>
                        <option id="brand" defaultValue="">Choose Brand</option>
                        {catgs.map((element)=>{
                            return (<option key = {element} value={element.toLowerCase()}>{capitalize(element)}</option>)
                        })}
                    </select>
                    <ul className="space-y-2 font-medium mb-5">
                        <p className="font-bold text-xl">Price</p>
                        <li>
                            <div className="flex items-center">
                                <input defaultChecked={min === 0 && max === 0} id="default-radio-2" type="radio" value="" min="0" max="0" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={handlePriceFilter} />
                                <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <input id="default-radio-3" type="radio" value="" min="0" max="100" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={handlePriceFilter} />
                                <label htmlFor="default-radio-3" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">$0 - $100</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <input id="default-radio-4" type="radio" value="" min="100" max="200" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={handlePriceFilter} />
                                <label htmlFor="default-radio-4" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">$100 - $200</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <input id="default-radio-5" type="radio" value="" min="200" max="300" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={handlePriceFilter} />
                                <label htmlFor="default-radio-5" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">$200 - $300</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <input id="default-radio-6" type="radio" value="" min="300" max="500" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={handlePriceFilter} />
                                <label htmlFor="default-radio-6" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">$300 - $500</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <input id="default-radio-7" type="radio" value="" min="500" max="1000" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={handlePriceFilter} />
                                <label htmlFor="default-radio-7" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">$500 - $1000</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <input id="default-radio-8" type="radio" value="" min="1000" max="1500" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={handlePriceFilter} />
                                <label htmlFor="default-radio-8" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">$1000 - $1500</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <input id="default-radio-9" type="radio" value="" min="1500" max="2000" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={handlePriceFilter} />
                                <label htmlFor="default-radio-9" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">$1500 - $2000</label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <input id="default-radio-9" type="radio" value="" min="2000" max="0" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={handlePriceFilter} />
                                <label htmlFor="default-radio-9" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">More than $2000</label>
                            </div>
                        </li>
                    </ul>

                    <label htmlFor="ratings" className="block mb-5 text-sm font-medium text-gray-900 dark:text-white">Ratings</label>
                    <select id="ratings" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleRatingsFilter}>
                        <option id="rating" value="">Choose Rating</option>
                        <option value="5">=5</option>
                        <option value="4">{">="} 4</option>
                        <option value="3">{">="} 3</option>
                        <option value="2">{">="} 2</option>
                    </select>


                </div>
            </aside>
        </>
    )
}

export default Filters
