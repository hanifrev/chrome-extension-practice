import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ThirdParty from "../components/ThirdParty";
import Cookies from "js-cookie";

const ContentScript = () => {
  // const [showThirdParty, setShowThirdParty] = useState(false);
  const [isCatching, setIsCatching] = useState(false);

  useEffect(() => {
    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(container);

    chrome.runtime.sendMessage({ action: "showThirdParty" }, (response) => {
      if (response && response.result) {
        console.log("Background script response:", response.result);
      }
    });

    chrome.runtime.onMessage.addListener(async function (
      request,
      sender,
      sendResponse
    ) {
      if (request.greeting === "hello") {
        await console.log("Content script received a message:", request);
        await sendResponse({ response: "Message received in content scripts" });
        // await setShowThirdParty(true);
      }
    });

    const cook = Cookies.get("pokename");
    console.log(cook);

    // chrome.storage.local.get().then((res) => {
    //   setIsCatching(res.isCatching);
    // });
  }, []);

  useEffect(() => {
    // Listen for changes in Chrome storage
    const handleStorageChange = (changes: any, areaName: any) => {
      if (areaName === "local" && "isCatching" in changes) {
        setIsCatching(changes.isCatching.newValue);
      }
    };

    // Add a listener to monitor changes in Chrome storage
    chrome.storage.onChanged.addListener(handleStorageChange);

    // Initial fetch of isCatching value
    chrome.storage.local.get("isCatching", (result) => {
      setIsCatching(result.isCatching || false); // Set to false if undefined
    });

    // Clean up the listener when the component unmounts
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  return <div>{isCatching && <ThirdParty />}</div>;
};

export default ContentScript;
