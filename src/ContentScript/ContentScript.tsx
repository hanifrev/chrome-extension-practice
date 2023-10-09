import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ThirdParty from "../components/ThirdParty";

const ContentScript = () => {
  const [showThirdParty, setShowThirdParty] = useState(false);

  let myState = false;

  useEffect(() => {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(container);
    setShowThirdParty(true);

    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === "updateState") {
        // Update the state based on the message
        myState = message.newState;
        console.log("State updated:", myState);
      }
    });

    // Render the ThirdParty component inside the container
    // ReactDOM.render(<ThirdParty />, container);
  }, []);
  // useEffect(() => {
  //   // Listen for the message to show ThirdParty
  //   chrome.runtime.onMessage.addListener((message) => {
  //     if (message.action === "showThirdParty") {
  //       // Set showThirdParty to true to trigger the rendering
  //       setShowThirdParty(true);
  //       console.log("message exist from contentscript");
  //     }
  //   });
  // }, []);

  return (
    <div>
      {showThirdParty && (
        <div>
          <ThirdParty />
        </div>
      )}
    </div>
  );
};

export default ContentScript;
