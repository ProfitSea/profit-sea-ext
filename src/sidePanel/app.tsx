import React from "react";
import Login from "./pages/login";
import Home from "./pages/Home";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";

enum SidePanelState {
  Login,
  Home,
}

const SidePanel = () => {
  const [view, setView] = React.useState<SidePanelState>(SidePanelState.Login);

  const renderView = () => {
    switch (view) {
      case SidePanelState.Login:
        return <Login />;
      case SidePanelState.Home:
        return <div>Home</div>;
      default:
        return <div>Home</div>;
    }
  };

  return (
    <MemoryRouter initialEntries={["/home"]}>
      <Routes>
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
      </Routes>
    </MemoryRouter>
  );
};

export default SidePanel;
