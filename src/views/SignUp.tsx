import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons from react-icons
import img from "../assets/signup.png"; // Ensure the path is correct

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setError: setFormError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (password !== confirmPassword) {
      setFormError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      clearErrors("confirmPassword");
    }
  }, [password, confirmPassword, setFormError, clearErrors]);

  const onSubmit = async (data: FormData) => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      localStorage.setItem("userName", data.username); // Store username in local storage
      navigate("/signin"); // Navigate to a welcome page after successful sign-up
    } catch (error) {
      setError("Failed to sign up. Please try again.");
      console.error("Sign-Up Error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex h-full gap-4">
      {/* Left Container */}
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center rounded-xl p-6 relative">
        {/* Sign Up Title */}
        <h2 className="text-zinc-600 text-3xl lg:text-5xl mb-2">
          Create an Account
        </h2>
        <p className="text-zinc-500 mb-6 text-center">
          Join us to explore and enjoy the latest movies and shows.
        </p>

        {/* Form Container */}
        <div className="w-full max-w-sm">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username Field */}
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-zinc-600 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className={`w-full rounded-full p-4 border border-gray-300 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <label className="block text-zinc-600 font-bold mb-2">
                Password
              </label>
              <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full rounded-full p-4 border border-gray-300 ${
                    errors.password ? "border-red-500" : ""
                  } pr-10`}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>~`\[\]])[A-Za-z0-9!@#$%^&*(),.?":{}|<>~`\[\]]{8,}$/,
                      message:
                        "Password must contain at least one number and one special character",
                    },
                  })}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-[60px] transform -translate-y-1/2 cursor-pointer flex text-gray-400 items-center"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4 relative">
              <label className="block text-zinc-600 font-bold mb-2">
                Confirm Password
              </label>
              <div className="flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`w-full rounded-full p-4 border border-gray-300 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  } pr-10`}
                  placeholder="Confirm your password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                  })}
                />
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-[60px] transform -translate-y-1/2 cursor-pointer flex text-gray-400 items-center"
                >
                  {showConfirmPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-4 mt-4 text-white bg-zinc-700 rounded-full"
            >
              Sign Up
            </button>
          </form>

          {/* 'Already have an account?' Link */}
          <p className="text-center underline mt-6 text-zinc-600">
            <a href="/signin">Already have an account? Sign In</a>
          </p>
        </div>
      </div>

      {/* Right Image Container (hidden on all screens) */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center rounded-xl">
        <img
          src={img}
          alt="Descriptive Alt Text"
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
    </div>
  );
}
