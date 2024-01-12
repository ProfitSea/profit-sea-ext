import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./pages/Layout/defaultLayout";
import { MessagingActions } from "../utils/actions/messagingActions.enum";

const Login = React.lazy(() => import("./pages/login"));
const ProtectedRoute = React.lazy(() => import("./pages/ProtectedRoute"));

const SidePanel = () => {
  useEffect(() => {
    chrome.runtime.connect({ name: "mySidepanel" });
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === MessagingActions.REFRESH_SIDEPANEL_AFTER_LOGIN) {
        // Implement your logic here to refresh the side panel
        location.reload(); // This is a simple way to refresh the current page
      }
    });

    return () => {
    };
  }, []);

  return (
    <React.Suspense
      fallback={
        <div className="h-[100vh] bg-black flex justify-center items-center">
          <CircularProgress />
        </div>
      }
    >
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route
            path="app"
            element={
              <ProtectedRoute>
                <DefaultLayout />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    </React.Suspense>
  );
};

export default SidePanel;
