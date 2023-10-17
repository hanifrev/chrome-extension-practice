import React, { useEffect, useState } from "react";
import ThirdParty from "../components/ThirdPartyContentScript/ThirdParty";
import Cookies from "js-cookie";
import { Provider } from "react-redux";
import store from "../store";

const ContentScript = () => {
  const [showThirdParty, setShowThirdParty] = useState(false);

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
      }
    });

    // put the catched pokemon name to console
    const cook = Cookies.get("pokename");
    console.log(cook);

    // to change the state for show / unshown the pokeball (still not working yet)
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log(message);
      console.log(message.action);
      if (message.action == "open_dialog_box") {
        setShowThirdParty(true);
      }
      return true;
    });
  }, []);

  console.log(showThirdParty);

  return (
    <div>
      {showThirdParty && (
        <Provider store={store}>
          <ThirdParty />
        </Provider>
      )}
    </div>
  );
};

export default ContentScript;
