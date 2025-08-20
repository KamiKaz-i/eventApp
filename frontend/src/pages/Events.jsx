import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import EventCard from "../components/Events/EventCard";
import { Box, Stack } from "@mui/material";
import { url } from "../url";
export default function Events() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${url}/api/events`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const events = await response.json();
          setEvents(events);
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
        {events &&
          events.map((event) => (
            <Stack key={event.id}>
              <EventCard
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
              />
            </Stack>
          ))}
      </Box>
    </Box>
  );
}
