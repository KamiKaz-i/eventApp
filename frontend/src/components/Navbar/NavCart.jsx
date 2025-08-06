import { useContext } from "react";
import { Link } from "react-router-dom";
import { Badge, Box, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "./Navbar.module.css";

import { orderContext } from "../../contexts/orderContext";
function NavCart() {
  const [orderTickets] = useContext(orderContext);
  return (
    <Link to="/cart" className={styles.link}>
      <Box sx={{ display: "flex" }}>
        <Badge
          badgeContent={orderTickets.length}
          color="success"
          sx={{
            "& .MuiBadge-badge": {
              right: -13,
              top: 13,
              borderRadius: 1.9,
              bgcolor: "white",
              color: "black",
              height: "14px",
              minWidth: "8px",
              width: "20px",
              p: 1,
            },
          }}
        >
          <ShoppingCartIcon></ShoppingCartIcon>
          <Typography sx={{ display: { lg: "block", xs: "none" } }}>
            Cart
          </Typography>
        </Badge>
      </Box>
    </Link>
  );
}

export default NavCart;
