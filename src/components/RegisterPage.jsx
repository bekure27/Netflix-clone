import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/context";
import { useEffect, useState } from "react";

function RegisterPage() {
  const [password, setPassword] = useState("");
  const { user, signUp, setUser } = UserAuth();
  const location = useLocation();
  const email = location.state?.email || null;
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
 if (password.length < 6) {
   throw new Error("Password must be at least 6 characters long");
 }

      await signUp(email, password);
      setUser(email);
      navigate("/home");
    } catch (error) {
      console.log(error.message);
      setError(error.message)
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

const styles = {
  backgroundColor: "white",
};



  return (
    <div style={styles} className="flex justify-center items-center h-screen">
      <div className="bg-white p-4 md:p-8">
        <h1 className="text-gray-800 mb-4 font-semibold text-2xl md:text-4xl">
          Welcome back! <br /> Joining Netflix is easy.
        </h1>
        <h4 className="text-gray-800 mb-6 text-lg md:text-xl">
          Enter your password and you'll be watching in no time.
        </h4>
        <p className="w-auto text-red-600 text-xl font-bold">{error}</p>
        <div className="mt-4 mb-6">
          <p className="text-gray-900">Email:</p>
          <p className="text-gray-700 font-bold">{email}</p>
        </div>
        <div className="mt-4 flex flex-col  md:flex-row items-center">
          <input
            onChange={handlePasswordChange}
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className="bg-gray-100  border border-gray-400  focus:border-blue-500 focus:outline-none    p-4 mb-2 md:mb-0 md:mr-2"
          />
          <button
            onClick={handleSubmit}
            className="bg-red-600 rounded text-white text-xl px-4 py-2 md:px-6 md:py-4"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;