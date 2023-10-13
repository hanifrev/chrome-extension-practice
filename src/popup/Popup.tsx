import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Login from "../components/Login";
import MainPage from "../components/MainPage";
import store from "../store";

const Popup = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    chrome.runtime.sendMessage({ popupMounted: true });
    console.log("----Popup rendered");

    chrome.storage.local.get("isAuthenticated", (result) => {
      setIsAuthenticated(result && result.isAuthenticated);
      console.log("---AUTH TEST");
    });
  }, []);

  console.log(isAuthenticated);

  return <>{isAuthenticated && isAuthenticated ? <MainPage /> : <Login />}</>;
};

export default Popup;
