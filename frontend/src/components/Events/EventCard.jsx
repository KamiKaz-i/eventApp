/* eslint-disable react/prop-types */
import {
  Typography,
  CardActions,
  Divider,
  Box,
  Stack,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router";
import EventIcon from "@mui/icons-material/Event";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TitleIcon from "@mui/icons-material/Title";
import ListIcon from "@mui/icons-material/List";

function EventCard({ event }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 3,
        width: "100%",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          maxWidth: 1000,
          mt: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            borderRadius: 0,
            border: "1px solid #e0e0e0",
            overflow: "hidden",
            bgcolor: "#ffffff",
            transition: "all 0.3s ease",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            "&:hover": {
              border: "1px solid #000000",
            },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "35%" },

              minHeight: { xs: 200, md: 280 },
              bgcolor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <img
              src={`/${event.type}.jpg`}
              alt={"Event"}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <TitleIcon sx={{ color: "black" }} />
                <Typography variant="body1" sx={{ color: "black" }}>
                  <strong>Title:</strong> {event.title}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ListIcon sx={{ color: "black" }} />
                <Typography variant="body1" sx={{ color: "black" }}>
                  <strong>Type:</strong> {event.type}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <EventIcon sx={{ color: "black" }} />
                <Typography variant="body1" sx={{ color: "black" }}>
                  <strong>Date:</strong>{" "}
                  {new Date(event?.date).toLocaleDateString()}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <AttachMoneyIcon sx={{ color: "black" }} />
                <Typography variant="body1" sx={{ color: "black" }}>
                  <strong>Price: </strong>
                  {event.price}
                </Typography>
              </Box>

              <Divider sx={{ borderColor: "#f0f0f0" }} />
            </Stack>

            <CardActions
              sx={{
                pt: 3,
                display: "flex",
                p: 0,
                mt: 2,
              }}
            >
              <Button
                onClick={() => {
                  navigate(`/events/${event.id}`);
                }}
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderRadius: 0,
                  color: "black",
                  borderColor: "black",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  ":hover": {
                    bgcolor: "black",
                    color: "white",
                    borderColor: "black",
                  },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Details
              </Button>
            </CardActions>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}

export default EventCard;
