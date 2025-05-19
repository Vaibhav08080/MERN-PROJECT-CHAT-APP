import { useState } from "react";
import { Link } from "react-router";
import { ShipWheelIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    terms: false,
  });
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/signup", signupData);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* SIGNUP FORM – LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          <div className="mb-6 flex items-center gap-3">
            <ShipWheelIcon size={32} className="text-green-400" />
            <span className="text-3xl font-bold text-green-400 tracking-widest">Streamify</span>
          </div>
          <h2 className="text-xl font-bold mb-1 text-white">Create an Account</h2>
          <p className="mb-4 text-sm text-gray-400">Join Streamify and start your language learning adventure!</p>
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={signupData.fullName}
                onChange={handleInputChange}
                className="input input-bordered w-full bg-base-200 text-white"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleInputChange}
                className="input input-bordered w-full bg-base-200 text-white"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleInputChange}
                className="input input-bordered w-full bg-base-200 text-white"
                placeholder="Enter your password"
                minLength={6}
                required
              />
              <p className="text-xs opacity-70 mt-1">Password must be at least 6 characters long</p>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  name="terms"
                  checked={signupData.terms}
                  onChange={handleInputChange}
                  required
                />
                <span className="text-xs leading-tight">
                  I agree to the {" "}
                  <span className="text-primary hover:underline">terms of service</span> and {" "}
                  <span className="text-primary hover:underline">privacy policy</span>
                </span>
              </label>
            </div>
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Signing up..." : "Create Account"}
            </button>
            {error && (
              <div className="text-red-400 text-xs text-center mt-1">
                {error.message || "Signup failed. Please try again."}
              </div>
            )}
          </form>
          <div className="text-center mt-4">
            <p className="text-sm">Already have an account? {" "}
              <Link to="/login" className="text-primary hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
        {/* SIGNUP FORM – RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Video call-bro.png" alt="Language connection illustration" className="w-full h-full" />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">Practice conversations, make friends, and improve your language skills together</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
