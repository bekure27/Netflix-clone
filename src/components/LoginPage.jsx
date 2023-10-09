import { useState } from "react";
import { UserAuth } from "../context/context";
import { Link, useNavigate } from "react-router-dom";




function LoginPage() {

const { user, logIn } = UserAuth();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();
const handleEmailChange = (e) => {
  setEmail(e.target.value);
};

const handlePasswordChange = (e) => {
  setPassword(e.target.value);
};

const handleSubmit = async (e) => {
 e.preventDefault();
 setError("");
  try {
    await logIn(email, password);
    navigate("/home");
  } catch (error) {
    console.log(error);
    setError(error.message)
  }
};


  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
        src="./images/cover.jpg"
        alt="cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      <div className="relative z-10 w-full max-w-xs p-6">
        <h1 className="text-3xl font-semibold text-white mb-6">Sign In</h1>
        {error ? <p className="p-3 bg-red-400 my-2">{error}</p> : null}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900  rounded-lg px-4 py-6"
        >
          <input
            onChange={handleEmailChange}
            className="w-full bg-gray-700 rounded-lg px-3 py-2 mb-4 text-white placeholder-gray-400"
            type="email"
            placeholder="Email"
            autoComplete="email"
          />
          <input
            onChange={handlePasswordChange}
            className="w-full bg-gray-700 rounded-lg px-3 py-2 mb-4 text-white placeholder-gray-400"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
          <button className="w-full bg-red-600 text-white rounded-lg py-2 mb-4">
            Sign In
          </button>
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center text-white">
              <input className="mr-1" type="checkbox" />
              <span>Remember me</span>
            </label>
            <p className="text-white">Need Help?</p>
          </div>
          <p className="text-white">
            <span className="mr-1">New to Netflix?</span>
            <Link to='/'>
            <span className="text-red-600">Sign Up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;