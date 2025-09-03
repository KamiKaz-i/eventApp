import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import EventCard from "../components/Events/EventCard";
import { Box, Stack } from "@mui/material";
import { url } from "../url";
import EventFilter from "../components/Events/EventFilter";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router";

export default function Events() {
  let location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [eventFilterForm, setEventFilterForm] = useState({
    search: searchParams.get("search"),
    priceGt: searchParams.get("priceGt"),
    priceLt: searchParams.get("priceLt"),
    eventType: searchParams.get("eventType") || "All Categories",
    hasTickets: searchParams.get("hasTickets") === "true",
  });
  useEffect(() => {
    const getEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${url}/api/events/${location.search}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const events = await response.json();
          console.log(location.search);
          console.log(eventFilterForm);
          setEvents(events);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEvents();
  }, [eventFilterForm, searchParams]);
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

      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          mt: "3rem",
          p: "1.5rem",
        }}
      >
        <EventFilter
          eventFilterForm={eventFilterForm}
          setEventFilterForm={setEventFilterForm}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        ></EventFilter>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
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
