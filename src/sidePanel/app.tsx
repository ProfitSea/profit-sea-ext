import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ProductsAnalysis from "./pages/ProductsAnalysis";

const Login = React.lazy(() => import("./pages/login"));
const Home = React.lazy(() => import("./pages/Home"));
const ListBuilder = React.lazy(() => import("./pages/ListBuilder"));
const ProductsType = React.lazy(() => import("./pages/ProductsType"));
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
          <Route
            path="listbuilder"
            element={
              <ProtectedRoute>
                <ListBuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path="productsType"
            element={
              <ProtectedRoute>
                <ProductsType />
              </ProtectedRoute>
            }
          />
          <Route
            path="productsAnalysis"
            element={
              <ProtectedRoute>
                <ProductsAnalysis />
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
