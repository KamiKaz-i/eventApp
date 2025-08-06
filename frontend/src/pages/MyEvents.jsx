import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import MyEventCard from "../components/Events/MyEventCard";
import { Box, Stack } from "@mui/material";
export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/events/myEvents",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const events = await response.json();

        setEvents(events);
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
      <Navbar></Navbar>
      <Box>
        {events &&
          events.map((event) => (
            <Stack key={event.id}>
              <MyEventCard
                event={{
                  id: event.id,
                  price: event.Ticket.price,
                  title: event.title,
                  description: event.description,
                  totalTickets: event.total_tickets,
                  date: event.date,
                  availableTickets: event.Ticket.quantity_available,
                  type: event.type,
                }}
                getEvents={getEvents}
              />
            </Stack>
          ))}
      </Box>
    </Box>
  );
}
