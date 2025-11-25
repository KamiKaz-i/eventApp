/* eslint-disable react/prop-types */
import {
  Card,
  Typography,
  CardContent,
  Divider,
  Button,
  CardActions,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useContext, useState } from "react";
import { userContext } from "../../contexts/userContext";
import { url } from "../../url";

export default function TicketCard({ order, onReturnSuccess }) {
  const { user } = useContext(userContext);
  const [showReturnControls, setShowReturnControls] = useState(false);
  const [returnQuantity, setReturnQuantity] = useState(1);

  const handleIncrease = () => {
    if (returnQuantity < order.ticketCount) {
      setReturnQuantity((quantity) => quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (returnQuantity > 1) {
      setReturnQuantity((quantity) => quantity - 1);
    }
  };

  const handleConfirmReturn = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/api/order-tickets/return`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          ticketId: order.ticketId,
          quantity: returnQuantity,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        if (onReturnSuccess) onReturnSuccess();
      } else {
        const data = await response.json();
        alert(data.message || "Failed to return ticket");
      }
    } catch (error) {
      console.log(error);
      alert("Error returning ticket");
    } finally {
      setShowReturnControls(false);
      setReturnQuantity(1);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        minWidth: 275,
        maxWidth: 400,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        border: "1px solid #e0e0e0",
        transition: "all 0.3s ease",
        backgroundColor: "#ffffff",
        "&:hover": {
          border: "1px solid #000000",
        },
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: "#000",
              fontWeight: 400,
              letterSpacing: "-0.5px",
            }}
          >
            {order.eventTitle}
          </Typography>
        </Box>

        <Divider sx={{ my: 2, borderColor: "#f0f0f0" }} />

        <Box display="flex" alignItems="center" mb={1.5} sx={{ color: "#000" }}>
          <CalendarTodayIcon sx={{ fontSize: "1rem", mr: 2, color: "#000" }} />
          <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
            {new Date(order.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" sx={{ color: "#000" }}>
          <ConfirmationNumberIcon
            sx={{ fontSize: "1rem", mr: 2, color: "#000" }}
          />
          <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
            {order.ticketCount} {order.ticketCount === 1 ? "Ticket" : "Tickets"}{" "}
            Owned
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0, display: "block" }}>
        {!showReturnControls ? (
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setShowReturnControls(true)}
            sx={{
              color: "black",
              borderColor: "black",
              borderRadius: 0,
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "0.75rem",
              padding: "10px",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "black",
              },
            }}
          >
            Return Ticket
          </Button>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid black",
                p: 0.5,
              }}
            >
              <Stack direction="row" alignItems="center">
                <IconButton
                  onClick={handleDecrease}
                  size="small"
                  disabled={returnQuantity <= 1}
                  sx={{ color: "black", borderRadius: 0 }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography sx={{ mx: 2, fontWeight: "bold" }}>
                  {returnQuantity}
                </Typography>
                <IconButton
                  onClick={handleIncrease}
                  size="small"
                  disabled={returnQuantity >= order.ticketCount}
                  sx={{ color: "black", borderRadius: 0 }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Stack>

              <Stack direction="row">
                <IconButton
                  onClick={handleConfirmReturn}
                  size="small"
                  sx={{
                    color: "white",
                    bgcolor: "black",
                    borderRadius: 0,
                    mr: 1,
                    "&:hover": { bgcolor: "#333" },
                  }}
                >
                  <CheckIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setShowReturnControls(false);
                    setReturnQuantity(1);
                  }}
                  size="small"
                  sx={{
                    color: "black",
                    border: "1px solid #e0e0e0",
                    borderRadius: 0,
                    "&:hover": { bgcolor: "#f5f5f5" },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
          </>
        )}
      </CardActions>
    </Card>
  );
}
