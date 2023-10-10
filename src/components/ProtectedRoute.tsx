import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: JSX.Element | any;
}

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.get("extUsername");
    chrome.storage.sync.get(["username"], (res) => {
      console.log(res.name);
    });
    chrome.storage.local.get("isAuthenticated", (result) => {
      const isAuthenticated = result.isAuthenticated;

      if (isAuthenticated) {
        // User is authenticated, allow access to the protected route
        console.log("User is authenticated");
        navigate("/main");
      } else {
        // User is not authenticated, navigate to the login page
        console.log("User is not authenticated. Redirecting to login page.");
        navigate("/");
      }
    });
  }, [navigate]);
  return children;
};

export default ProtectedRoute;
