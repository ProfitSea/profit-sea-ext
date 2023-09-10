import React from "react";
import { createRoot } from "react-dom/client";

const Popup = () => {

  return (
    <div>
      <h1>Profit Sea</h1>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
