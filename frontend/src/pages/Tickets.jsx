import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState, useContext } from "react";
import { Box, Grid } from "@mui/material";
import { userContext } from "../contexts/userContext";
import TicketCard from "../components/Tickets/TicketCard";
export default function Tickets() {
  const { user } = useContext(userContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/api/order/user/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const orders = await response.json();
          console.log(orders);

          setOrders(orders);
        }
      } catch (error) {
        console.log(error);
      }
    };
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
      <Navbar></Navbar>
      <Box>
        <Grid container spacing={2}>
          {orders &&
            orders.map((order) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
                <TicketCard
                  order={{
                    date: order.date,
                    eventTitle: order.eventTitle,
                    ticketCount: order.ticketCount,
                  }}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
