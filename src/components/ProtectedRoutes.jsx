import { useContext } from "react";
import { GlobalState } from "../context/GlobalContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { data } = useContext(GlobalState);
  return data ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
