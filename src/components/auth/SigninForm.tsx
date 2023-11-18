import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingSpinner from "../LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../appwrite/appwriteConfig";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

type FormValue = {
  email: string;
  password: string;
};

const SigninForm = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const schema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must contain at least 8 character(s)"),
  });

  const form = useForm<FormValue>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const onSubmit = async (data: FormValue) => {
    const newSession = await signin(data);

    const response = await newSession;

    if (response) {
      const UserDetails = {
        userId: response.$id,
        name: response.name,
      };
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You have successfully sign in.",
        showConfirmButton: false,
        timer: 2500,
      });
      setUser(UserDetails);
      navigate("/");
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong. Please try again later.",
        showConfirmButton: false,
        timer: 2500,
      });
    }

    reset();
  };

  return (
    <div className="w-full h-screen  flex justify-between items-center ">
      <div className="flex-1 px-4 md:px-20 max-w-4xl">
        <h1 className=" text-primary-dark text-xl md:text-3xl font-medium">
          Welcome to Design Community{" "}
        </h1>
        <p className=" text-secondary-dark text-sm md:text-base">
          Don't have an ccount? <Link to={"/signup"}>Sign up</Link>{" "}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 md:mt-10">
          <div className="  xl:w-[660px] flex flex-col mb-4">
            <label htmlFor="email" className=" text-gray1 text-sm">
              Email
            </label>
            <input
              type="text"
              id="email"
              className=" rounded-md py-2 px-4 mt-1 border border-gray1 outline-none"
              {...register("email")}
            />
            <p className=" text-sm mt-1 text-red-500">
              {errors.email?.message}{" "}
            </p>
          </div>
          <div className="  xl:w-[660px] flex flex-col">
            <label htmlFor="password" className=" text-gray1 text-sm">
              Password
            </label>
            <input
              type="text"
              id="password"
              className=" rounded-md py-2 px-4 mt-1 border border-gray1 outline-none"
              {...register("password")}
            />
            <p className=" text-sm mt-1 text-red-500">
              {errors.password?.message}{" "}
            </p>
          </div>
          <div className="flex mt-4 md:mt-10">
            <input
              type="checkbox"
              id="remember"
              className=" w-6 h-6 mr-3 accent-black"
            />
            <label
              htmlFor="remember"
              className=" text-primary-dark text-sm md:text-base"
            >
              Remember Me
            </label>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className={` ${
              isSubmitting ? "cursor-not-allowed" : ""
            } w-fit flex items-center bg-primary-button text-white text-base md:text-lg px-6 py-4 md:py-5 md:px-10 mt-3 md:mt-8 rounded-full tracking-wider duration-300 hover:bg-primary-dark`}
          >
            {isSubmitting && <LoadingSpinner />} Create an acount
          </button>

          <p className="ml-2 mt-2 text-[12px]">
            Don't have an account? <Link to={"/signup"}>Sign up</Link>
          </p>
        </form>
      </div>
      <div className="flex-1 hidden min-[1124px]:block">
        <img className="ms-auto h-full" src="./assets/side-bg.png" alt="" />
      </div>
    </div>
  );
};

export default SigninForm;
