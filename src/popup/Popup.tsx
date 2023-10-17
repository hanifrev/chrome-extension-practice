import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Login from "../components/PopUp/Login";
import MainPage from "../components/PopUp/MainPage";
import store from "../store";

const Popup = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
