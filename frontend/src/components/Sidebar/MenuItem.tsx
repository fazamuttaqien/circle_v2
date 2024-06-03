import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from "./MenuIcon";

const MENU = [
  {
    name: "Home",
    path: "/",
    icon: {
      active: <MenuIcon icon="./src/assets/home-outlined.svg" />,
      nonActive: <MenuIcon icon="./src/assets/home.svg" />,
    },
  },
  {
    name: "Search",
    path: "/search",
    icon: {
      active: <MenuIcon icon="./src/assets/search-outlined.svg" />,
      nonActive: <MenuIcon icon="./src/assets/search.svg" />,
    },
  },
  {
    name: "Follows",
    path: "/follows",
    icon: {
      active: <Favorite sx={{ fontSize: 30 }} />,
      nonActive: <FavoriteBorder sx={{ fontSize: 30 }} />,
    },
  },
  {
    name: "Profile",
    path: "/profile",
    icon: {
      active: <MenuIcon icon="./src/assets/profile-outlined.svg" />,
      nonActive: <MenuIcon icon="./src/assets/profile.svg" />,
    },
  },
];

const MenuItem = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {MENU.map((item) => (
        <NavLink
          to={item.path}
          style={{ textDecoration: "none" }}
          key={item.name}
        >
          {({ isActive }) => (
            <Box
              color={isActive ? "#fff" : "rgba(255, 255, 255, 0.6)"}
              display={"flex"}
              alignItems={"center"}
              sx={{ gap: 2 }}
            >
              {isActive ? item.icon.active : item.icon.nonActive}{" "}
              <Typography fontSize={20}>{item.name}</Typography>
            </Box>
          )}
        </NavLink>
      ))}
    </Box>
  );
};

export default MenuItem;
