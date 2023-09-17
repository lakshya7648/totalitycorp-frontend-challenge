import { useEffect, useState } from "react"
import { capitalize } from "../utils/index";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCategory } from "../state/CategoriesSlicer/CategoriesSlicer";

function Categories() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const category = useSelector(state=>state.categories.category);

    const moveNext = ()=>{
        document.getElementById("catContain").scrollLeft += 100;
    }
    const movePrev = ()=>{
        document.getElementById("catContain").scrollLeft -= 100;
    }
    const fetchCategories = async () => {
        // logic to fetch all the categories present in the backend
        // dummy api is being used to show the categories while furthur any api can be used to get the categories

        // API URL
        const url = "https://dummyjson.com/products/categories"
        const response = await fetch(url);
        const result = await response.json();
        
        setLoading(false);
        dispatch(setCategory(result));
        
    }
    //Fetch the Category while the website loads to make the user select his category easily.
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
                {/* Data being fetched from a dummy api may create scroll bar however this behaviour may be controlled while working with our own api */}
                <div className="relative overflow-x-auto bg-white flex" id="catContain">
                    {loading && <Spinner/>}
                    <button className="self-start py-3 bg-white border border-black px-2 shadow sticky left-0" onClick={movePrev}>&larr;</button>
                    <table className="w-auto text-sm scroll-smooth text-left mx-10 text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-900 uppercase  dark:text-gray-400">
                            <tr>
                                {category.map((element) => {
                                    return <th key={element} scope="col" className="px-6 py-2">
                                        <Link to={`/products/category/${element}`}>{element}</Link>
                                    </th>
                                })}
                            </tr>
                        </thead>
                    </table>
                    <button className="self-end py-3 bg-white border border-black px-2 shadow-md sticky right-0" onClick={moveNext}>&rarr;</button>
                </div>

        </>
    )
}

export default Categories
