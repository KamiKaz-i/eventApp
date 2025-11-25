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
import { useParams } from "react-router";
import { userContext } from "../contexts/userContext";
import { orderContext } from "../contexts/orderContext";
import Navbar from "../components/Navbar/Navbar";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import { url } from "../url";

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
      const response = await fetch(`${url}/api/events/${id}`, {
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
      const response = await fetch(`${url}/api/order-tickets`, {
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
          bgcolor: "#f8f8f8", // Off-white background for contrast
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
            <Alert
              severity="success"
              onClose={() => setSuccess(null)}
              sx={{ borderRadius: 0 }}
            >
              {success}
            </Alert>
          )}
          {error && (
            <Alert
              severity="error"
              onClose={() => setError(null)}
              sx={{ borderRadius: 0 }}
            >
              {error}
            </Alert>
          )}

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 0, // Sharp corners
              border: "1px solid #e0e0e0", // Minimalist border
              bgcolor: "#ffffff",
            }}
          >
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
                  bgcolor: "#f5f5f5",
                  borderRadius: 0, // Sharp corners for image container
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  src={`/${event.type}.jpg`}
                  alt="Event"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 0, // Sharp corners for image
                    display: "block",
                  }}
                ></img>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TitleIcon sx={{ color: "black" }} />
                    <Typography variant="body1">
                      <strong>Title:</strong> {event.title}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ListIcon sx={{ color: "black" }} />
                    <Typography variant="body1">
                      <strong>Type:</strong> {event.type}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EventIcon sx={{ color: "black" }} />
                    <Typography variant="body1">
                      <strong>Date:</strong>{" "}
                      {new Date(event?.date).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AttachMoneyIcon sx={{ color: "black" }} />
                    <Typography variant="body1">
                      <strong>Price:</strong> ${event.Ticket?.price || "N/A"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ConfirmationNumberIcon sx={{ color: "black" }} />
                    <Typography variant="body1">
                      <strong>Total Tickets: </strong> {event.total_tickets}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ConfirmationNumberIcon sx={{ color: "black" }} />
                    <Typography variant="body1">
                      <strong>Tickets Available: </strong>{" "}
                      {event?.Ticket.quantity_available}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                  >
                    <PersonIcon sx={{ color: "black" }} />
                    <Typography variant="body1">
                      <strong>Created by:</strong> {event.owner}
                    </Typography>
                  </Box>

                  <Divider sx={{ borderColor: "#f0f0f0" }} />

                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                  >
                    <DescriptionIcon sx={{ color: "black", mt: 0.5 }} />
                    <Typography variant="body1">
                      <strong>Description:</strong> {event.description}
                    </Typography>
                  </Box>
                </Stack>

                <CardActions sx={{ justifyContent: "flex-end", mt: 2, p: 0 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    disabled={event.Ticket.quantity_available === 0}
                    onClick={handleAddToCart}
                    startIcon={<ConfirmationNumberIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontWeight: "bold",
                      fontSize: "1rem",
                      borderRadius: 0, // Sharp corners
                      color: "black",
                      borderColor: "black",
                      textTransform: "uppercase", // Matching other buttons
                      ":hover": {
                        bgcolor: "black",
                        color: "white",
                        borderColor: "black",
                      },
                      // Custom disabled style to maintain layout
                      "&.Mui-disabled": {
                        color: "#999",
                        borderColor: "#e0e0e0",
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
