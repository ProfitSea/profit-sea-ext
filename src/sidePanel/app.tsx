import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Login = React.lazy(() => import("./pages/login"));
const ListBuilder = React.lazy(() => import("./pages/ListBuilder"));
const Products = React.lazy(() => import("./pages/Products"));
const ProtectedRoute = React.lazy(() => import("./pages/ProtectedRoute"));

const SidePanel = () => {
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
            path="list-builder"
            element={
              <ProtectedRoute>
                <ListBuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path="products"
            element={
              <ProtectedRoute>
                <Products />
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
