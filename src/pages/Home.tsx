import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Welcome to home page! Mr.{user ? user.name : "not logged in"}</h1>
    </div>
  );
};

export default Home;
