import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import browser from "webextension-polyfill";

import "../index.css";
import store from "../store";
import Popup from "./Popup";

browser.tabs.query({ active: true, currentWindow: true }).then(() => {
  const container = document.getElementById("root");
  const root = createRoot(container!);

  root.render(
    <Provider store={store}>
      <Popup />
    </Provider>
  );
});
