import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Restaurant from "./pages/Restaurant/Restaurant";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import Reserve from "./pages/Reserve/Reserve";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyAccount from "./pages/Dashboard/MyAccount/MyAccount";
import MyBookings from "./pages/Dashboard/MyBookings/MyBookings";
import ChangePassword from "./pages/Dashboard/ChangePassword/ChangePassword";
import AddRestaurant from "./pages/Dashboard/AddRestaurant/AddRestaurant";
import MyRestaurants from "./pages/Dashboard/MyRestaurants/MyRestaurants";
import UpdateRestaurant from "./pages/Dashboard/MyRestaurants/UpdateRestaurant/UpdateRestaurant";
import AddItem from "./pages/Dashboard/AddItem/AddItem";

function App() {
  return (
    <main className="m-auto bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/restaurant/:slug" element={<Restaurant />} />
        <Route path="/reserve/:slug" element={<Reserve />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Dashboard />}>
            <Route path="/dashboard/my-account" element={<MyAccount />} />
            <Route path="/dashboard/my-bookings" element={<MyBookings />} />
            <Route
              path="/dashboard/change-password"
              element={<ChangePassword />}
            />
            <Route
              path="/dashboard/add-restaurant"
              element={<AddRestaurant />}
            />
            <Route
              path="/dashboard/my-restaurants"
              element={<MyRestaurants />}
            />
            <Route
              path="/dashboard/my-restaurant/:slug"
              element={<UpdateRestaurant />}
            />
            <Route path="/dashboard/add-item/:slug" element={<AddItem />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>

      <Toast />
    </main>
  );
}

export default App;
