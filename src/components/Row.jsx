import { useEffect, useState } from "react"
import axios from "../utils/api";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoMdAddCircleOutline, IoMdAddCircle } from "react-icons/io";
import "../App.css";
import { UserAuth } from "../context/context";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase-config";
const imgURL = "https://image.tmdb.org/t/p/w500";

function Row(props) {
  const { title, reqUrl, netflixOrginal } = props;
  let [movies, setMovies] = useState([]);
  let [trailerUrl, setTrailerUrl] = useState("");
  let [hoveredIndex, setHoveredIndex] = useState(-1);
  let [add, setAdd] = useState(false);
  let [save, setSaved] = useState(false);
  let { user } = UserAuth();
  const movieID = doc(db, "users", `${user?.email}`);

  // get movie data
  const getMoviesData = async () => {
    try {
      const response = await axios.get(reqUrl);
      // console.log(response.data.results);
      setMovies(response.data.results);
      return response;
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  //  https://image.tmdb.org/t/p/w500/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg
  useEffect(() => {
    getMoviesData();
  }, [reqUrl]);

  // console.log(movies)

  // to control hover effect
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  // to play movie trailler from youtube
  const openTrailer = (movie, index) => {
    setHoveredIndex(index);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie?.title ||
          movie?.original_title ||
          movie?.name ||
          movie?.original_name
      )
        .then((url) => {
          console.log("URL", url);
          const urlObject = new URL(url);
          const queryParamsString = urlObject.search;
          const urlParams = new URLSearchParams(queryParamsString);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.error(`abebe ${err}`));
    }
  };


// save favorite movies 
const saveMovie = async (movie) => {
  if (user?.email) {
    setAdd(!add);
    setSaved(true);
    await updateDoc(movieID, {
      savedMovies: arrayUnion({
        id: movie.id,
        title: movie.title ||movie?.original_title || movie?.name || movie?.original_name,
        img: movie.backdrop_path,
      }),
    });
  } 
};






  //   slider setting 
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  let slideShowValue = netflixOrginal ? 7 : 6;
  let playState = trailerUrl ? 0 : 1;

  // let playState = 1;
  const sliderSettings = {
    autoplay: playState,
    speed: 1000,
    infinite: true,
    slidesToShow: slideShowValue,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="ml-5 text-white overflow-hidden">
      <h1 className="text-3xl  font-bold p-3">{title}</h1>
      <div className="w-full ">
        <Slider {...sliderSettings}>
          {movies.map(
            (movie, index) =>
              movie.backdrop_path && (
                <>
                  <div
                    className="relative"
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      onClick={() => openTrailer(movie)}
                      className={`" cursor-pointer object-contain max-h-28 hover:scale-105 mr-3 transition ease-linear  duration-300  " ${
                        netflixOrginal &&
                        "max-h-64 mt-4  hover:scale-110  ease-linear duration-300 "
                      }`}
                      key={movie.id}
                      src={`${imgURL}${
                        netflixOrginal ? movie.poster_path : movie.backdrop_path
                      }`}
                      alt={movie?.title}
                    />

                    {!netflixOrginal && hoveredIndex === index && (
                      <>
                        <div className="mt-1">
                          <p className="text-white font-bold text-xl">
                            {movie?.title ||
                              movie?.original_title ||
                              movie?.name ||
                              movie?.original_name}
                          </p>
                        </div>
                        <div
                          onClick={() => saveMovie(movie)}
                          className=" absolute top-0 right-0 px-7 "
                        >
                          {add ? (
                            <IoMdAddCircle className="text-red-600" size={22} />
                          ) : (
                            <IoMdAddCircleOutline
                              className="text-red-600"
                              size={22}
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </>
              )
          )}
        </Slider>
      </div>

      <div className="p-4 ">
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row