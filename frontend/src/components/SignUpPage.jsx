
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SignUpPage() {
  const [email, setEmail] = useState("");
   const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailFocus = () => {
    setIsFocused(true);
  };

  const handleEmailBlur = () => {
    setIsFocused(false);
  };



  const handleGetStarted = () => {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
       setError("Please enter a valid email address");
       return;
     }


    navigate("/register", { state: { email } });
  };


  

  
  return (
    <div className="relative min-h-screen bg-gray-900">
      <img
        className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
        src="./images/cover.jpg"
        alt="cover"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="  absolute inset-0 flex flex-col items-center justify-center">
        <div className="max-w-md mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-10 sm:text-2xl md:text-3xl lg:text-5xl  ">
            Unlimited movies, TV shows, and more
          </h1>
          <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl mb-6">
            Watch anywhere. Cancel anytime.
          </h3>
          <h4 className="text-lg sm:text-xl md:text-xl lg:text-2xl mb-6  ">
            Ready to watch? Enter your email to create or restart your
            membership.
          </h4>

          {error && (
            <p className="text-xl bg-black py-2 w-auto text-red-600 mb-4 font-bold">
              {error}
            </p>
          )}

          <div className="flex flex-col items-center justify-center mb-8 sm:flex-row sm:justify-start sm:items-center">
            <input
              onChange={handleEmailChange}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              className="bg-gray-800 text-gray-50 opacity-70 rounded py-4 px-4 w-full sm:w-64 md:w-80 lg:w-96 mb-4 sm:mb-0 sm:mr-4"
              type="email"
              placeholder="Email address"
              autoComplete="email"
            />
            <button
              onClick={handleGetStarted}
              className="bg-red-600 text-white rounded font-bold text-xl py-3 px-4 whitespace-nowrap"
            >
              <p className="flex items-center">
                Get Started <MdKeyboardArrowRight size={32} className="ml-2" />
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;


