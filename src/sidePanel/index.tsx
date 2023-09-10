import Button from "@mui/material/Button";
import React from "react";
import { createRoot } from "react-dom/client";

const SidePanel = () => {
  return (
    <div>
      <h1>Just a check</h1>
      <Button>I am Mui</Button>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <SidePanel />
  </React.StrictMode>
);
