import { Box, Divider, Drawer, List, ListItem } from "@mui/material";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../lib/Queries/Auth.query";
import Navbar from "./Navbar";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../../pages/Error/Error.page";

interface TProps {
  window?: () => Window;
}

const DashboardLayout = (props: TProps) => {
  const { data } = useAuth();
  const drawerWidth = 240;

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <NavLink
        to="/"
        className="px-4 py-2 inline-block font-bold italic underline cursor-pointer text-gray-700 text-xl md:text-2xl"
      >
        BookMyTable
      </NavLink>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link className="py-2 px-4 w-full hover:bg-gray-100" to={"/"}>
            Home
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            className="py-2 px-4 w-full hover:bg-gray-100"
            to={"/dashboard/my-bookings"}
          >
            Bookings
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            className="py-2 px-4 w-full hover:bg-gray-100"
            to={"/dashboard/my-account"}
          >
            Account
          </Link>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <Link
            className="py-2 px-4 w-full hover:bg-gray-100"
            to={"/dashboard/add-restaurant"}
          >
            <div className="flex items-center">
              <span className="text-white bg-gray-700 rounded-sm flex items-center justify-center h-5 w-5 mr-2">
                +
              </span>
              Add Restaurant
            </div>
          </Link>
        </ListItem>

        {data?.role === "OWNER" && (
          <ListItem disablePadding>
            <Link
              className="py-2 px-4 w-full hover:bg-gray-100"
              to={"/dashboard/my-restaurants"}
            >
              Restaurants
            </Link>
          </ListItem>
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <main className="m-auto bg-gray-50 flex flex-col min-h-svh">
        <Navbar />
        <div className="flex">
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerClose}
              onTransitionEnd={handleDrawerTransitionEnd}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>

          <Box
            className="absolute top-10 left-2 cursor-pointer text-3xl"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            &#9776;
          </Box>
          <Outlet />
        </div>
      </main>
    </ErrorBoundary>
  );
};

export default DashboardLayout;
