import {  Outlet,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const auth = useSelector((state) => state.auth);
  console.log('hello')
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};


const RedirectIfAuthenticated = () => {
  const auth = useSelector((state) => state.auth);
  return auth.isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export  {RedirectIfAuthenticated,ProtectedRoute};