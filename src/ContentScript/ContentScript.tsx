import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ThirdParty from "../components/ThirdParty";
import Cookies from "js-cookie";

const ContentScript = () => {
  const [showThirdParty, setShowThirdParty] = useState(false);
  const [isCatching, setIsCatching] = useState<boolean>(false);

  useEffect(() => {
    const container = document.createElement("div");
    container.style.position = "fixed";
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
        await setShowThirdParty(true);
      }
    });

    // put the catched pokemon name to console
    const cook = Cookies.get("pokename");
    console.log(cook);
  }, []);

  // to change the state for show / unshown the pokeball (still not working yet)
  useEffect(() => {
    chrome.storage.local.get().then((res) => {
      setIsCatching(res.isCatching);
    });
  }, []);

  return <div>{isCatching && <ThirdParty />}</div>;
};

export default ContentScript;
