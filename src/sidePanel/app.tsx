import React from "react";
import Login from "./pages/login";
import Home from "./pages/Home";

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
    <>
      <Home />
    </>
  );
};

export default SidePanel;
