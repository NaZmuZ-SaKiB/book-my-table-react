import { Link } from "react-router-dom";
import MyAccountForm from "../../../components/forms/MyAccountForm";
import Loading from "../../../components/loaders/Loading";
import { useGetLoggedInUserQuery } from "../../../lib/Queries/User.query";

const MyAccount = () => {
  const { data, isLoading } = useGetLoggedInUserQuery();

  if (isLoading) return <Loading />;
  return (
    <div className="w-full max-w-screen-md mx-auto p-2 pt-5">
      <h2 className="text-center text-3xl font-bold text-gray-700 mb-5 lg:mb-10">
        Your Account
      </h2>
      <div className="bg-white rounded shadow px-3 py-5 mb-5">
        <MyAccountForm user={data?.data} />
      </div>
      <Link
        to="/dashboard/change-password"
        className="text-sm underline text-blue-400 hover:text-blue-500 cursor-pointer"
      >
        <button
          type="button"
          className="rounded bg-orange-600 px-4 py-2 text-white"
        >
          Change Password
        </button>
      </Link>
    </div>
  );
};

export default MyAccount;
