import React, { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignIn, toggleSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    const nameValue = name.current ? name.current.value : "";
    const emailValue = email.current ? email.current.value : "";
    const passwordValue = password.current ? password.current.value : "";

    const message = checkValidData(
      isSignIn,
      nameValue,
      emailValue,
      passwordValue
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignIn) {
      // Sign Up logic here
      // Create a new user in your database
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed up
          updateProfile(auth.currentUser, {
            displayName: nameValue,
            photoURL:
              "https://i.postimg.cc/rpqJzST6/the-batman-movie-poster-4k-wallpaper-1210d.jpg",
          })
            .then(() => {
              // Profile updated!
              const { uid, displayName, email, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, displayName, email, photoURL }));
              navigate("/browse");
            })
            .catch((error) => {
              navigate("/error");
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
          // ..
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <>
      <div className="bg-loginPageBg h-lvh">
        <Header />
        <div className="h-3/4 w-full flex justify-center items-center">
          <form
            className="bg-black  w-[350px] opacity-90 py-10 px-8 text-white rounded-lg"
            onSubmit={(e) => e.preventDefault()}
          >
            <h1 className="text-3xl  font-bold mb-8">
              {isSignIn ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignIn && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="p-3 my-3 w-full bg-slate-700"
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="p-3 my-3 w-full bg-slate-700"
            />
            <input
              ref={password}
              type="password"
              placeholder="password"
              className="p-3 my-3 w-full bg-slate-700"
            />
            <p className="text-red-600 text-xl">{errorMessage}</p>
            <button
              type="button"
              className="bg-red-800 font-bold text-xl w-full my-6 p-2 rounded-lg"
              onClick={handleButtonClick}
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
