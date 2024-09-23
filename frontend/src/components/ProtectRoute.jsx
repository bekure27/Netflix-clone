
import {  useNavigate } from "react-router-dom";
import { UserAuth } from "../context/context";
import {  useEffect } from "react";

function ProtectRoute({ children }) {
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return user ? children : null;
}

export default ProtectRoute;