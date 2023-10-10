import React from "react";
import ReactDOM from "react-dom/client";
import ContentScript from "./ContentScript";

const rootElement = document.createElement("div");
rootElement.style.position = "sticky";
rootElement.style.width = "auto";
rootElement.style.height = "auto";
rootElement.style.zIndex = "999";
rootElement.style.bottom = "0";
// rootElement.style.left = "0";
rootElement.style.pointerEvents = "auto";

document.body.appendChild(rootElement);

console.log("qwerty");

ReactDOM.createRoot(rootElement).render(<ContentScript />);
