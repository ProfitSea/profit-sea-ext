import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { identifiers } from "../../utils/enums/identifier.enum";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    chrome.storage.local.get(identifiers.PROFITSEA_ACCESS_TOKEN, (result) => {
      if (!result.profit_sea_token) {
        return navigate("/login");
      }
    });
  }, []);
  return children as React.ReactElement;
};

export default ProtectedRoute;
