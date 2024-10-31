import React, { useState } from "react";

import Header from "./Header";

const Login = () => {
  const [isSignIn, toggleSignIn] = useState(true);
  return (
    <>
      <div className="bg-loginPageBg h-lvh">
        <Header />
        <div className="h-3/4 w-full flex justify-center items-center">
          <form className="bg-black  w-[350px] opacity-90 py-10 px-8 text-white rounded-lg">
            <h1 className="text-3xl  font-bold mb-8">
              {isSignIn ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignIn && (
              <input
                type="text"
                placeholder="Full Name"
                className="p-3 my-3 w-full bg-slate-700"
              />
            )}
            <input
              type="text"
              placeholder="Email Address"
              className="p-3 my-3 w-full bg-slate-700"
            />
            <input
              type="password"
              placeholder="password"
              className="p-3 my-3 w-full bg-slate-700"
            />

            <button
              type="button"
              className="bg-red-800 font-bold text-xl w-full my-6 p-2 rounded-lg"
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
            <p
              className="pl-1 cursor-pointer"
              onClick={() => {
                toggleSignIn(!isSignIn);
              }}
            >
              {isSignIn
                ? "New to Netflix? Sign Up Now"
                : "Already a Member? Sign In Now"}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
