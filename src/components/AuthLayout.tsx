import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthLayout = () => {
  const { user } = useAuth();
  return (
    <div className="w-full h-screen  flex justify-between items-center ">
      {user ? (
        <Navigate to={"/"} />
      ) : (
        <>
          {" "}
          <Outlet />
          <div className="flex-1 hidden min-[1124px]:block">
            <img className="ms-auto h-full" src="./assets/side-bg.png" alt="" />
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default AuthLayout;
