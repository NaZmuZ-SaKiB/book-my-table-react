import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <main className="bg-white dark:bg-gray-900 min-h-svh grid place-items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-red-600 dark:text-red-500">
            Error
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Ops! Clientside Error.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, an error has occurred. Please try again later.
          </p>
          <p
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
            className="inline-flex text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 cursor-pointer"
          >
            Back to Homepage
          </p>
        </div>
      </div>
    </main>
  );
};

export default Error;
