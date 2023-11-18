import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../appwrite/appwriteConfig";

const Navbar = () => {
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className=" bg-secondary-dark text-white px-6 py-4 flex items-center justify-between">
      <Link to={"/"}>Logo</Link>
      <div className="flex items-center gap-6">
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>

        {user ? (
          <>
            <button
              onClick={() => handleLogout()}
              className="border border-white py-2 px-4"
              type="button"
            >
              Log out
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
