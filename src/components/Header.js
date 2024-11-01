import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        // An error occurred.
        console.error("Sign Out Error", error);
      });
  };

  return (
    <div className="flex justify-between items-center w-full bg-gradient-to-b from-black">
      <div className="ml-8">
        <img
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="netflix-logo"
          className="w-[200px] h-25  brightness-200"
        />
      </div>
      {user && (
        <div className="flex items-center gap-1 mr-8">
          <img
            src={user.photoURL}
            alt="profile-pic"
            className="w-12 h-12 bg-center bg-cover"
          />
          <button
            type="button"
            className="py-3 px-6 rounded-lg text-white font-bold cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
