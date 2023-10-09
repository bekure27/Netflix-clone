import { useEffect, useState } from "react";
import axios from "../utils/api";
import "../App.css";
import { Link } from "react-router-dom";

const imgURL = "https://image.tmdb.org/t/p/original";


function Banner({ reqUrl  }) {
const [movies, setMovies] = useState([]);


 
const getData = async () => {
try {
const response = await axios.get(reqUrl)
    setMovies(response.data.results)
    return response
}

catch(err){
    console.error("banner data ", err)
} 
}

useEffect(()=> {
    getData()
}, [])

const pickRandomData = (movies) => {
const randomIndex = Math.floor(Math.random() * movies.length);
return movies[randomIndex];
}

const netflixOrginal = pickRandomData(movies); 
// console.log(netflixOrginal)

const title =
  netflixOrginal?.title ||
  netflixOrginal?.original_name ||
  netflixOrginal?.name;

  let  discription = netflixOrginal?.overview;
   discription = discription?.length > 160 ? discription.substring(0,160) + "...": discription;

  return (
    <div
      className="bg-center bg-cover bg-no-repeat  "
      style={{
        backgroundImage: `URL(${imgURL}${netflixOrginal?.backdrop_path})`,
        height: "500px",
      }}
    >
      <div className="h-52 ml-8 pt-36">
        <h1 className="text-white text-4xl pb-2">{title}</h1>
        <div className="">

          <button className="text-white bg-gray-800 bg-opacity-50 font-bold px-8 py-2 mr-8 rounded-sm  border-none hover:bg-gray-300 outline-none hover:text-black hover:transition-all">
            Play
          </button>
         
         <Link to='/user'>
          <button className="text-white bg-gray-800 bg-opacity-50 font-bold px-8 py-2  rounded-sm border-none  hover:bg-gray-300 outline-none hover:text-black hover:transition-all ">
            My List
          </button>
         </Link>
        </div>
        <div className="text-white leading-5 pt-4 text-sm  max-w-sm  h-20 ">
          {discription}
        </div>
      </div>

      <div className="banner_fadeBottom "></div>
    </div>
  );
}




export default Banner;
