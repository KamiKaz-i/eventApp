/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { useContext } from "react";
import { url } from "../../url.jsx";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { orderContext } from "../../contexts/orderContext";
export default function OrderTicketCard({ orderTicket }) {
  const [, , fetchOrders] = useContext(orderContext);
  const onDecrease = async () => {
    try {
      if (orderTicket.quantity > 1) {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${url}/api/order-tickets/${orderTicket.id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity: orderTicket.quantity - 1 }),
          }
        );
        if (response.ok) {
          fetchOrders();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onIncrease = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/order-tickets/${orderTicket.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: orderTicket.quantity + 1 }),
        }
      );
      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onRemove = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/order-tickets/${orderTicket.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "start", m: 2 }}>
      <Card
        sx={{
          width: { lg: "70%", md: "100%", sm: "100%", xs: "100%" },
        }}
      >
        <img
          src={`/${orderTicket.Ticket.Event.type}.jpg`}
          alt={"Event"}
          style={{
            width: "100%",
            height: "100px",
            objectFit: "cover",
            margin: "0",
            padding: "0",
          }}
        />
        <Card
          sx={{
            p: 1,
            boxShadow: 3,
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h6">
                {orderTicket.Ticket.Event.title} on{" "}
                {dayjs(orderTicket.Ticket.Event.date).format(" DD/MM/YYYY ")}
              </Typography>
              <Typography variant="body1">
                Subtotal: <strong>{orderTicket.subtotal_price} $</strong>
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "start", p: 1 }}>
            <Button
              sx={{ minWidth: "36px" }}
              size="small"
              color="black"
              onClick={onDecrease}
            >
              -
            </Button>
            <Typography variant="body1">
              <strong>{orderTicket.quantity}</strong>
            </Typography>
            <Button
              size="small"
              sx={{ minWidth: "36px" }}
              color="black"
              onClick={onIncrease}
            >
              +
            </Button>
            <Button size="small" onClick={onRemove} color="black">
              remove<DeleteForeverIcon></DeleteForeverIcon>
            </Button>
          </CardActions>
        </Card>
      </Card>
    </Box>
  );
}
