import React from "react";
import { createRoot } from "react-dom/client";
import SidePanel from "./app";

import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <SidePanel />
  </Provider>
);
