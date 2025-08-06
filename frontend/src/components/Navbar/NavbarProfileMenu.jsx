import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography, Avatar, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import WalletIcon from "@mui/icons-material/Wallet";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./Navbar.module.css";
import EventIcon from "@mui/icons-material/Event";
import { userContext } from "../../contexts/userContext.jsx";
import { orderContext } from "../../contexts/orderContext.jsx";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
export default function NavbarProfileMenu() {
  const navigate = useNavigate();
  const [, setOrderTickets] = useContext(orderContext);
  const { user, setUser } = useContext(userContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    navigate("/login");
    setOrderTickets(null);
    setUser(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          textAlign: "center",
          height: "100%",
        }}
      >
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            color: "white",
            textTransform: "none",
            borderRadius: 0,
            height: "100%",
            width: { lg: "150px", sm: "40" },
          }}
        >
          <Avatar sx={{ bgcolor: "inherit" }}>
            <AccountCircleIcon fontSize="large"></AccountCircleIcon>
          </Avatar>
          <Typography
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            {user.username}
          </Typography>
          <KeyboardArrowDownIcon
            sx={{
              transition: "transform 0.4s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </Button>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        marginThreshold={0}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              maxWidth: 200,
              minWidth: 200,
              overflow: "visible",
              filter: "drop-shadow(0px 1px 8px rgba(0,0,0,0.26))",
              borderRadius: 0,
              right: "0px",
            },
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: 0,
        }}
        transformOrigin={{
          vertical: 0,
          horizontal: 0,
        }}
      >
        <MenuItem sx={{ p: 0 }} onClick={handleClose}>
          <Link to="/wallet" className={styles.menulink}>
            <Box sx={{ width: "100%", display: "flex", p: 1, gap: 1 }}>
              <WalletIcon />
              <Typography>Wallet</Typography>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={handleClose}>
          <Link to="/my-tickets" className={styles.menulink}>
            <Box sx={{ width: "100%", display: "flex", p: 1, gap: 1 }}>
              <LocalActivityIcon />
              <Typography>Tickets</Typography>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={handleClose}>
          <Link to="/my-events" className={styles.menulink}>
            <Box sx={{ width: "100%", display: "flex", p: 1, gap: 1 }}>
              <EventIcon />
              <Typography>My Events</Typography>
            </Box>
          </Link>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={handleLogOut}>
          <Box sx={{ width: "100%", display: "flex", p: 1, gap: 1 }}>
            <Logout />
            <Typography>Logout</Typography>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
}
