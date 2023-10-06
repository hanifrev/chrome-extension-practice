import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../components/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import MainPage from "../components/MainPage";
import browser from "webextension-polyfill";
import Error from "../components/Error";

const Popup = () => {
  useEffect(() => {
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return (
    <>
      {/* <MainPage /> */}
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default Popup;

// ReactDOM.render(
//   <React.StrictMode>
//     <Popup />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
