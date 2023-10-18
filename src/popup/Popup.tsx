import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Login from "../components/PopUp/Login";
import MainPage from "../components/PopUp/MainPage";

const Popup = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    chrome.runtime.sendMessage({ popupMounted: true });
    console.log("----Popup rendered");

    chrome.storage.local.get("isAuthenticated", (result) => {
      setIsAuthenticated(result.isAuthenticated);
      console.log("---AUTH TEST");
    });
  }, []);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, []);

  const login = async () => {
    if (await chrome.storage.local.get("isAuthenticated"))
      setIsAuthenticated(true);
  };

  console.log(isAuthenticated);

  return (
    <div key={key}>
      {isAuthenticated ? <MainPage /> : <Login onLogin={login} />}
    </div>
  );
};

export default Popup;
