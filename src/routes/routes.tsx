import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home.page";
import Restaurant from "../pages/Restaurant/Restaurant.page";
import Reserve from "../pages/Reserve/Reserve.page";
import Search from "../pages/Search/Search.page";
import DashboardLayout from "../components/layout/DashboardLayout";
import MyAccount from "../pages/Dashboard/MyAccount/MyAccount.page";
import ChangePassword from "../pages/Dashboard/ChangePassword/ChangePassword.page";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import AddRestaurant from "../pages/Dashboard/AddRestaurant/AddRestaurant";
import MyRestaurants from "../pages/Dashboard/MyRestaurants/MyRestaurants";
import UpdateRestaurant from "../pages/Dashboard/UpdateRestaurant/UpdateRestaurant.page";
import AddItem from "../pages/Dashboard/AddItem/AddItem.page";
import NotFound from "../pages/NotFound/NotFound.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/restaurant/:slug",
        element: <Restaurant />,
      },
      {
        path: "/reserve/:slug",
        element: <Reserve />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <MyAccount />,
      },
      {
        path: "/dashboard/my-account",
        element: <MyAccount />,
      },
      {
        path: "/dashboard/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/dashboard/my-bookings",
        element: <MyBookings />,
      },
      {
        path: "/dashboard/add-restaurant",
        element: <AddRestaurant />,
      },
      {
        path: "/dashboard/my-restaurants",
        element: <MyRestaurants />,
      },
      {
        path: "/dashboard/my-restaurants/:slug",
        element: <UpdateRestaurant />,
      },
      {
        path: "/dashboard/add-item/:slug",
        element: <AddItem />,
      },
    ],
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
