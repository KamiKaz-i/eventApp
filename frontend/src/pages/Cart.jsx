import { Box, Stack, Paper, Typography, Divider } from "@mui/material";
import { useContext } from "react";
import { orderContext } from "../contexts/orderContext";
import OrderTicketCard from "../components/Cart/OrderTicketCard";
import OrderSummary from "../components/Cart/OrderSummary";
import Navbar from "../components/Navbar/Navbar";
export default function Cart() {
  const [orderTickets, , , order] = useContext(orderContext);
  console.log(orderTickets);

  if (orderTickets.length === 0) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#F4F4F4" }}>
        <Navbar />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{
            width: "100%",
            maxWidth: "1400px",
            mx: "auto",
            p: { xs: 2, sm: 3, md: 4 },
            alignItems: "flex-start",
          }}
        >
          <Paper
            elevation={2}
            sx={{ flex: 2, width: "100%", p: 3, borderRadius: 2 }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 3, fontWeight: 600 }}
            >
              Cart is empty
            </Typography>
          </Paper>
        </Stack>
      </Box>
    );
  }

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
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{
          width: "100%",
          maxWidth: "1400px",
          mx: "auto",
          p: { sm: 3, md: 4 },
          alignItems: "flex-start",
        }}
      >
        <Paper
          elevation={2}
          sx={{ flex: 2, width: "100%", p: 3, borderRadius: 2 }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 3, fontWeight: 600 }}
          >
            Cart - {orderTickets.length}{" "}
            {orderTickets.length === 1 ? "item" : "items"}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={3}>
            {orderTickets.map((orderTicket) => (
              <Box key={orderTicket.id}>
                <OrderTicketCard orderTicket={orderTicket} />
                <Divider sx={{ mt: 3 }} />
              </Box>
            ))}
          </Stack>
        </Paper>

        <Box sx={{ flex: 1, width: "100%", position: "sticky", top: 90 }}>
          <OrderSummary order={order} />
        </Box>
      </Stack>
    </Box>
  );
}
