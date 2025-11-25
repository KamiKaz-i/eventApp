/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
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
        `${url}/api/order-tickets/${orderTicket.id}`,
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
        `${url}/api/order-tickets/${orderTicket.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        borderRadius: 0,
        border: "1px solid #e0e0e0",
        bgcolor: "#ffffff",
        transition: "all 0.3s ease",
        mb: 2,
        "&:hover": {
          border: "1px solid #000000",
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "160px" },
          minHeight: { xs: "160px", sm: "auto" },
          bgcolor: "#f5f5f5",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <img
          src={`/${orderTicket.Ticket.Event.type}.jpg`}
          alt="Event"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ p: 3, pb: 1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 400,
                  color: "black",
                  lineHeight: 1.2,
                  mb: 0.5,
                }}
              >
                {orderTicket.Ticket.Event.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", textTransform: "uppercase" }}
              >
                {dayjs(orderTicket.Ticket.Event.date).format("DD/MM/YYYY")}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 400, color: "black" }}>
              ${orderTicket.subtotal_price}
            </Typography>
          </Stack>
        </CardContent>

        <CardActions
          sx={{
            p: 3,
            pt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #e0e0e0",
              }}
            >
              <Button
                onClick={onDecrease}
                sx={{
                  minWidth: "32px",
                  height: "32px",
                  borderRadius: 0,
                  color: "black",
                  p: 0,
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                -
              </Button>
              <Typography
                sx={{
                  px: 2,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "black",
                }}
              >
                {orderTicket.quantity}
              </Typography>
              <Button
                onClick={onIncrease}
                sx={{
                  minWidth: "32px",
                  height: "32px",
                  borderRadius: 0,
                  color: "black",
                  p: 0,
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                +
              </Button>
            </Box>
          </Stack>

          <Button
            onClick={onRemove}
            variant="outlined"
            startIcon={<DeleteForeverIcon />}
            sx={{
              borderRadius: 0,
              textTransform: "uppercase",
              fontWeight: 600,
              fontSize: "0.75rem",
              color: "black",
              borderColor: "black",
              px: 2,
              ":hover": {
                bgcolor: "black",
                color: "white",
                borderColor: "black",
              },
            }}
          >
            Remove
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
