import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className=" bg-secondary-dark text-white px-6 py-4 flex items-center justify-between">
      <Link to={"/"}>Logo</Link>
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
          </>
        ) : null}

        <Link
          target="_blank"
          to={"/signin"}
          className="border border-white py-2 px-4"
          type="button"
        >
          Log in
        </Link>
        <Link
          target="_blank"
          to={"/signup"}
          className="border border-white py-2 px-4"
          type="button"
        >
          sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
