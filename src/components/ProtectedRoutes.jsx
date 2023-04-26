import { useContext } from "react";
import { GlobalState } from "../context/GlobalContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { data, loading } = useContext(GlobalState);
  return loading ? null : data ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
