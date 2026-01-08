import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState, useContext } from "react";
import { Box, Grid, Container, Typography, Alert } from "@mui/material";
import { userContext } from "../contexts/userContext";
import TicketCard from "../components/Tickets/TicketCard";
import { url } from "../url";

export default function Tickets() {
  const { user } = useContext(userContext);
  const [orders, setOrders] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const getEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/api/order/user/${user.id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const orders = await response.json();
        setOrders(orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

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

      <Container maxWidth="xl" sx={{ mt: 8, mb: 5 }}>
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
        <Typography
          variant="h3"
          sx={{
            mb: 6,
            color: "#000",
            fontWeight: 300,
            letterSpacing: "-1px",
            textTransform: "uppercase",
          }}
        >
          My Tickets
        </Typography>

        {orders.length === 0 ? (
          <Typography variant="h6" sx={{ fontWeight: 300, color: "#555" }}>
            No tickets found.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {orders &&
              orders.map((order, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={order.eventId || index}
                >
                  <TicketCard
                    order={{
                      date: order.date,
                      eventTitle: order.eventTitle,
                      ticketCount: order.ticketCount,
                      eventId: order.eventId,
                      ticketId: order.ticketId,
                    }}
                    onReturnSuccess={getEvents}
                    setSuccess={setSuccess}
                    setError={setError}
                  />
                </Grid>
              ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
