import { Link, NavLink, useLocation } from "react-router-dom";
import AuthModal from "../shared/AuthModal";
import { useAuth } from "../../lib/Queries/Auth.query";
import { removeUser } from "../../lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import { tags } from "../../constants";

const Navbar = () => {
  const { data, isLoading } = useAuth();

  const queryClient = useQueryClient();

  const signout = () => {
    removeUser();
    queryClient.invalidateQueries({
      queryKey: [tags.Auth],
    });
  };

  const location = useLocation();
  return (
    <div className="bg-white">
      <nav className="max-w-screen-2xl mx-auto bg-white z-50 p-1 md:p-2 flex items-center justify-center sm:justify-between border-b">
        {!location.pathname.includes("dashboard") ? (
          <NavLink
            to="/"
            className="font-bold italic underline cursor-pointer text-gray-700 text-xl md:text-2xl"
          >
            BookMyTable
          </NavLink>
        ) : (
          <span></span>
        )}
        <div className="hidden sm:block">
          <div className="flex items-center">
            {!isLoading && data ? (
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
                <AuthModal isSignin={true} />
                <AuthModal isSignin={false} />
              </>
            )}
          </div>
        </div>
      </nav>
      <nav className="grid grid-cols-3 sm:hidden fixed z-50 bottom-0 left-0 right-0 bg-white  border-t">
        {!isLoading && data ? (
          <>
            <Link
              to="/dashboard/my-account"
              className="bg-white text-center text-gray-700  p-1 px-4 border-r border-l"
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className="bg-white text-center text-gray-700  p-1 px-4"
            >
              <div className="fixed bottom-0 left-[50%] translate-x-[-50%] bg-white h-10 w-10 rounded-full flex items-center justify-center border border-gray-700">
                <img
                  className="w-6 h-6 object-cover"
                  src="/assets/home-button.png"
                  alt=""
                />
              </div>
            </Link>
            <button
              onClick={signout}
              className="bg-white text-gray-700  p-1 px-4 border-r border-l"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <AuthModal isSignin={true} />
            <Link
              to="/"
              className="bg-white text-center text-gray-700  p-1 px-4"
            >
              <div className="fixed bottom-0 left-[50%] translate-x-[-50%] bg-white h-10 w-10 rounded-full flex items-center justify-center border border-gray-700">
                <img
                  className="w-6 h-6 object-cover"
                  src="/assets/home-button.png"
                  alt=""
                />
              </div>
            </Link>
            <AuthModal isSignin={false} />
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
