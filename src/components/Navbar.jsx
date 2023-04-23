import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { GlobalState } from "../context/GlobalContext";
import useAuth from "../hooks/useAuth";
import AuthModel from "./AuthModal";

const Navbar = () => {
  const { data, loading } = useContext(GlobalState);
  const { signout } = useAuth();
  return (
    <nav className="bg-white  p-1 md:p-2 flex items-center justify-center sm:justify-between border-b">
      <NavLink
        to="/"
        className="font-bold cursor-pointer text-gray-700 text-xl md:text-2xl"
      >
        BookMyTable
      </NavLink>
      <div className="hidden sm:block">
        <div className="flex items-center">
          {!loading && data ? (
            <>
              <Link
                to="/dashboard/my-account"
                className="bg-blue-400 text-sm md:text-reg text-white border py-1 px-4 rounded mr-2"
              >
                Dashboard
              </Link>
              <button
                onClick={signout}
                className="bg-white text-sm md:text-reg text-blue-400 border border-blue-400 p-1 px-4 rounded cursor-pointer"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <AuthModel isSignin={true} />
              <AuthModel isSignin={false} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
