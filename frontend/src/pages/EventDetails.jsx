import { useEffect, useState, useContext } from "react";
import {
  Box,
  CardActions,
  Stack,
  Paper,
  Button,
  Typography,
  Divider,
  Alert,
} from "@mui/material";

import TitleIcon from "@mui/icons-material/Title";
import ListIcon from "@mui/icons-material/List";
import { useParams } from "react-router-dom";
import { userContext } from "../contexts/userContext";
import { orderContext } from "../contexts/orderContext";
import Navbar from "../components/Navbar/Navbar";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
export default function EventDetails() {
  const { user } = useContext(userContext);
  const [, , fetchOrders] = useContext(orderContext);
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const getEvent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/events/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch event details");
      }

      const eventData = await response.json();
      console.log(eventData.owner);

      setEvent(eventData);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    getEvent();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/order-tickets`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          ticketId: event.Ticket.id,
          quantity: 1,
        }),
      });
      const res = await response.json();
      if (!response.ok) {
        throw new Error(res.message);
      }

      setSuccess("Ticket added to cart");
      fetchOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  if (event) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "#F4F4F4",
        }}
      >
        <Navbar />

        <Stack
          spacing={3}
          sx={{
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            p: { xs: 2, md: 4 },
          }}
        >
          {success && (
            <Alert severity="success" onClose={() => setSuccess(null)}>
              {success}
            </Alert>
          )}
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Paper elevation={3} sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", md: "40%" },
                  height: { lg: 370, md: 370, xs: 275 },
                  bgcolor: "gray",
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`/${event.type}.jpg`}
                  alt="Event"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                  }}
                ></img>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TitleIcon color="black" />
                    <Typography variant="body1">
                      <strong>Title:</strong> {event.title}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ListIcon color="black" />
                    <Typography variant="body1">
                      <strong>Type:</strong> {event.type}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EventIcon color="black" />
                    <Typography variant="body1">
                      <strong>Date:</strong>{" "}
                      {new Date(event?.date).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AttachMoneyIcon color="black" />
                    <Typography variant="body1">
                      <strong>Price:</strong> ${event.Ticket?.price || "N/A"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ConfirmationNumberIcon color="black" />
                    <Typography variant="body1">
                      <strong>Total Tickets: </strong> {event.total_tickets}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ConfirmationNumberIcon color="black" />
                    <Typography variant="body1">
                      <strong>Tickets Available: </strong>{" "}
                      {event?.Ticket.quantity_available}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                  >
                    <PersonIcon color="black" />
                    <Typography variant="body1">
                      <strong>Created by:</strong> {event.owner}
                    </Typography>
                  </Box>
                  <Divider />

                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                  >
                    <DescriptionIcon color="black" sx={{ mt: 0.5 }} />
                    <Typography variant="body1">
                      <strong>Description:</strong> {event.description}
                    </Typography>
                  </Box>
                </Stack>

                <CardActions sx={{ justifyContent: "flex-end", mt: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    disabled={event.Ticket.quantity_available === 0}
                    onClick={handleAddToCart}
                    startIcon={<ConfirmationNumberIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontWeight: "bold",
                      fontSize: "1rem",
                      bgcolor: "#3f3f3f",
                      ":hover": {
                        bgcolor: "#5f5f5f",
                      },
                    }}
                  >
                    {event.Ticket.quantity_available > 0
                      ? "Buy Ticket"
                      : "Sold Out"}
                  </Button>
                </CardActions>
              </Box>
            </Box>
          </Paper>
        </Stack>
      </Box>
    );
  }
}
