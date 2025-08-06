/* eslint-disable react/prop-types */
import { Card, Typography, CardContent, Divider } from "@mui/material";
export default function TicketCard({ order }) {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 400 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography fontSize="26px" color="black" gutterBottom component="div">
          {order.eventTitle}
        </Typography>
        <Divider></Divider>
        <Typography gutterBottom variant="body2">
          Date: {new Date(order.date).toLocaleDateString()}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Tickets owned: {order.ticketCount}
        </Typography>
      </CardContent>
    </Card>
  );
}
