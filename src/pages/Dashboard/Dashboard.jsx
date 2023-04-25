import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";

import { GlobalState } from "../../context/GlobalContext";
import { IconButton } from "@mui/material";

const Dashboard = (props) => {
  const { data } = useContext(GlobalState);
  const drawerWidth = 240;

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
      </List>
      {data?.role === "OWNER" && (
        <>
          <Divider />
          <List>
            <ListItem disablePadding>
              <Link
                className="py-2 px-4 w-full hover:bg-gray-100"
                to={"/dashboard/my-restaurants"}
              >
                Restaurants
              </Link>
            </ListItem>
          </List>
        </>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="flex">
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
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
        className="absolute top-10 left-2 cursor-pointer"
        onClick={handleDrawerToggle}
        sx={{ display: { sm: "none" } }}
      >
        &#9776;
      </Box>
      <Outlet />
    </div>
  );
};

export default Dashboard;
