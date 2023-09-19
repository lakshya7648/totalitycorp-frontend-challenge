import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom"
import Filters from "./Filters";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";

const ProductsListing = () => {
    // Getting category from url as a parameter and will fetch all the content related to the asked category
    const { category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    
    // state to handle the products
    const [products, setProducts] = useState([]);


    // state for saving the filtered products
    const [filteredProducts, setFilteredProducts] = useState([]);

    let total = 0;
    const limit = 10;
    // URL for fetching the products with limit furthur can be replaced with our own api
    let url = '';
   
    
    const fetchProductsOfCategory = async () => {
        
        const response = await fetch(url);
        const result = await response.json();
        total = result.total;
        setProducts(result.products);
        
        setFilteredProducts(result.products); 
        setLoading(false);
    }
    

    useEffect(() => {
        if(category) {
            url = `https://dummyjson.com/products/category/${category}?limit=${limit}`;
        } else{
            url =  `https://dummyjson.com/products/search?q=${searchParams.get("q")}`;
        }
        fetchProductsOfCategory();
    }, [category, searchParams])

    // We are getting a discount percentage as well i will use that lateron if got time

    return (
        <div className="px-4 sm:ml-72">
            <Filters products={products} setFilteredProducts={setFilteredProducts} productCateg={category}/>
            <div className="w-full flex justify-center items-center">
                {loading && <Spinner/>}
            </div>
            <div className="py-4 px-2 grid grid-cols-1 md:grid-cols-4 gap-8 grid-flow-row">
            {filteredProducts.map((element)=>{
                return (
                    <ProductCard key={element.id} id={element.id} thumbnail={element.thumbnail} title={element.title} ratings={element.rating} price={element.price}/>
                );
            })}
            </div>
        </div>
    )
}

export default ProductsListing
