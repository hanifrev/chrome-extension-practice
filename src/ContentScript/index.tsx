import React from "react";
import ReactDOM from "react-dom/client";
import ContentScript from "./ContentScript";

const rootElement = document.createElement("div");
rootElement.style.position = "fixed";
rootElement.style.width = "100vw";
rootElement.style.height = "100vh";
rootElement.style.zIndex = "999999";
rootElement.style.top = "0";
rootElement.style.left = "0";
rootElement.style.pointerEvents = "none";

document.body.appendChild(rootElement);

console.log(rootElement);
console.log("qwerty");

ReactDOM.createRoot(rootElement).render(<ContentScript />);