import React from "react";
import { createRoot } from "react-dom/client";
import SidePanel from "./app";

import "./index.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <SidePanel />
  </React.StrictMode>
);
