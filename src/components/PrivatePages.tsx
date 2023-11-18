import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivatePages = () => {
  const { user } = useAuth();
  return <div>{user ? <Outlet /> : <Navigate to={"/signin"} />}</div>;
};

export default PrivatePages;
