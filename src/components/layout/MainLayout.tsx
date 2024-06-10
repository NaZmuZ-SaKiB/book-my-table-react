import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <main className="m-auto bg-gray-50 flex flex-col min-h-svh">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
