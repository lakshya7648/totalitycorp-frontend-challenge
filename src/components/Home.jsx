import { useSelector } from "react-redux";
import ShowProducts from "./ShowProducts";
import Spinner from "./Spinner";
import { useEffect } from "react";

function Home() {
  const category = useSelector(state=>state.categories.category);
  const limit = 4;

  useEffect(() => {
    document.title="eShop - An Ecommerce platform";
  }, [])
  
  
  return (
    <>
        {category.slice(0, 5).map((element)=>{
          return <ShowProducts key={element} category={element} limit={limit}/>
        })}
        {/* will add footer soon */}
    </>
  )
}

export default Home
