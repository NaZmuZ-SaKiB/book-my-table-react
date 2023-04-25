import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { GlobalState } from "../context/GlobalContext";
import useAuth from "../hooks/useAuth";
import AuthModel from "./AuthModal";

const Navbar = () => {
  const { data, loading } = useContext(GlobalState);
  const { signout } = useAuth();
  return (
    <>
      <nav className="bg-white z-50 p-1 md:p-2 flex items-center justify-center sm:justify-between border-b">
        <NavLink
          to="/"
          className="font-bold italic underline cursor-pointer text-gray-700 text-xl md:text-2xl"
        >
          BookMyTable
        </NavLink>
        <div className="hidden sm:block">
          <div className="flex items-center">
            {!loading && data ? (
              <>
                <Link
                  to="/dashboard/my-account"
                  className="bg-gray-700 text-sm md:text-reg text-white py-1 px-4 rounded mr-2 hover:underline"
                >
                  Dashboard
                </Link>
                <button
                  onClick={signout}
                  className="bg-white text-sm md:text-reg text-gray-700 border border-gray-700 p-1 px-4 rounded cursor-pointer hover:underline"
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
      <nav className="grid grid-cols-3 sm:hidden fixed z-50 bottom-0 left-0 right-0 bg-white  border-t">
        {!loading && data ? (
          <>
            <Link
              href="/dashboard/my-account"
              className="bg-white text-center text-sm text-gray-700  p-1 px-4 border-r border-l"
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="bg-white text-center text-sm text-gray-700  p-1 px-4 border-r border-l"
            >
              Home
            </Link>
            <button
              onClick={signout}
              className="bg-white text-gray-700 text-sm  p-1 px-4 border-r border-l"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <AuthModel isSignin={true} />
            <Link
              href="/"
              className="bg-white text-center text-sm text-gray-700  p-1 px-4 border-r border-l"
            >
              Home
            </Link>
            <AuthModel isSignin={false} />
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
