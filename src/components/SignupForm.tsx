import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "../appwrite/appwriteConfig";
import LoadingSpinner from "./LoadingSpinner";
import Swal from "sweetalert2";

type FormValue = {
  username: string;
  email: string;
  password: string;
};

const SignupForm = () => {
  const schema = z.object({
    username: z
      .string()
      .min(4, "Username must contain at least 4 character(s)"),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must contain at least 8 character(s)"),
  });

  const form = useForm<FormValue>({
    defaultValues: {
      username: "",
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
    const response = await signup(data);

    if (!response?.name) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong. Please try again later.",
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You have successfully signed up.",
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
          Already have an ccount? <a href={"/"}>Log in</a>{" "}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 md:mt-10">
          <div className="  xl:w-[660px] flex flex-col mb-4">
            <label htmlFor="username" className=" text-gray1 text-sm">
              username
            </label>
            <input
              type="text"
              id="username"
              className=" rounded-md py-2 px-4 mt-1 border border-gray1 outline-none"
              {...register("username")}
            />
            <p className=" text-sm mt-1 text-red-500">
              {errors.username?.message}{" "}
            </p>
          </div>
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
            <ul className=" grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-2 mt-2">
              <li className="password-tips">Use 8 or more characters</li>
              <li className="password-tips">One Uppercase character</li>
              <li className="password-tips">One lowercase character</li>
              <li className="password-tips">One special character</li>
              <li className="password-tips">One number</li>
            </ul>
          </div>
          <div className="flex mt-4 md:mt-10">
            <input
              type="checkbox"
              id="notification"
              className=" w-6 h-6 mr-3 accent-black"
            />
            <label
              htmlFor="notification"
              className=" text-primary-dark text-sm md:text-base"
            >
              I want to receive emails about the product, feature updates,
              events, and marketing promotions.
            </label>
          </div>
          <p className="mt-4 md:mt-12 text-sm md:text-base ">
            By creating an account, you agree to the Terms of use and Privacy
            Policy.
          </p>

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
            Already have an account? Log in
          </p>
        </form>
      </div>
      <div className="flex-1 hidden min-[1124px]:block">
        <img className="ms-auto h-full" src="./assets/side-bg.png" alt="" />
      </div>
    </div>
  );
};

export default SignupForm;
