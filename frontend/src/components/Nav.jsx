import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/context";
import "../App.css";


function Nav() {
  const [show, setShow] = useState(false);
 const {isSubscribed,user, logOut } = UserAuth();
 const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
 

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

// console.log(isSubscribed)


 const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`flex justify-between items-center fixed z-50 top-0 w-full h-11 px-5 py-5 transition-all duration-500 ease-in ${
        show ? "bg-black" : ""
      }`}
    >
      <Link to={user?.email ? "/home" : "/"}>
        <img
          className="w-24  ml-3 object-contain -m-7 "
          src="/images/netflix_logo.png"
          alt="netflix-logo"
        />
      </Link>

      <div className="">
        {user?.email ? (
          <div className="flex gap-6 ">
            {isSubscribed ? (
              <Link to="/user">
                <button className=" bg-red-600 px-5 py-1  text-white font-bold rounded">
                  My Movies
                </button>
              </Link>
            ) : (
              <Link to="/subscribe">
                <button className=" bg-red-600 px-5 py-1  text-white font-bold rounded">
                  Subscribe
                </button>
              </Link>
            )}

            <button
              onClick={handleLogout}
              className=" bg-red-600 px-5 py-1 text-white font-bold rounded"
              title={user?.email}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className=" bg-red-600 px-5 py-1 text-white font-bold rounded">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Nav;