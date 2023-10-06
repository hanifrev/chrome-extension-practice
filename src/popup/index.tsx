import * as React from "react";
import { createRoot } from "react-dom/client";
import browser from "webextension-polyfill";
import { HashRouter } from "react-router-dom";

import "../index.css";
import Popup from "./Popup";

browser.tabs.query({ active: true, currentWindow: true }).then(() => {
  const container = document.getElementById("root");
  const root = createRoot(container!);

  root.render(
    <>
      <Popup />
    </>
  );
});
