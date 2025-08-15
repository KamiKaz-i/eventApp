import { AppBar, Toolbar, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import NavbarProfileMenu from "./NavbarProfileMenu.jsx";
//import Logo from "./Amphitheatre.svg?react";

import NavCart from "./NavCart.jsx";
export default function Navbar() {
  return (
    <AppBar position="sticky" sx={{ bgcolor: "black", top: 0, width: "100%" }}>
      <Toolbar
        sx={{
          height: 60,
          "&.MuiToolbar-gutters": { paddingRight: 0 },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
        >
          {/*<Logo style={{ width: "70px" }}></Logo>*/}
          <Link to="/create-event" className={styles.link}>
            Create Event
          </Link>
          <Link to="/events" className={styles.link}>
            Events
          </Link>
        </Stack>
        <Stack
          direction="row"
          display={"flex"}
          alignContent={"center"}
          alignItems={"center"}
          sx={{
            height: "100%",
            gap: 4,
          }}
        >
          <NavCart></NavCart>
          <NavbarProfileMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
