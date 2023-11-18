import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SignupForm from "./components/auth/SignupForm";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AuthLayout from "./components/AuthLayout";
import SigninForm from "./components/auth/SigninForm";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import PrivatePages from "./components/PrivatePages";

const RootLayout = () => {
  const isLoggedin = true;
  return (
    <>
      <Navbar />
      <main className=" h- flex justify-center items-center">
        {isLoggedin ? <Outlet /> : <Navigate to={"signin"} />}
      </main>
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route path="signup" element={<SignupForm />} />
        <Route path="signin" element={<SigninForm />} />
      </Route>
      <Route element={<PrivatePages />}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
