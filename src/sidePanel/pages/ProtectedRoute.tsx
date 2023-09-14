import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  // useLayoutEffect(() => {
  //   chrome.storage.local.get(["user"], (result) => {
  //     if (!result.user) {
  //       return navigate("/login");
  //     }
  //   });
  // }, []);
  return children as React.ReactElement;
};

export default ProtectedRoute;
