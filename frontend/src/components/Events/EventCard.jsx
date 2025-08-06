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
import { useNavigate } from "react-router-dom";
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
        bgcolor: "#F4F4F4",
      }}
    >
      <Stack
        spacing={3}
        sx={{
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          p: { xs: 2, md: 4 },
        }}
      >
        <Paper elevation={3} sx={{ p: 3 }}>
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
                height: { lg: 238, md: 238, xs: 250 },
                bgcolor: "gray",
                borderRadius: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={`/${event.type}.jpg`}
                alt={"Event"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TitleIcon color="black" />
                  <Typography variant="body1">
                    <strong>Title:</strong> {event.title}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <ListIcon color="black" />
                  <Typography variant="body1">
                    <strong>Type:</strong> {event.type}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EventIcon color="black" />
                  <Typography variant="body1">
                    <strong>Date:</strong>{" "}
                    {new Date(event?.date).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AttachMoneyIcon color="black" />
                  <Typography variant="body1">
                    <strong>Price: </strong>
                    {event.price}
                  </Typography>
                </Box>

                <Divider />
              </Stack>

              <CardActions sx={{ pt: 3 }}>
                <Button
                  onClick={() => {
                    navigate(`/events/${event.id}`);
                  }}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    bgcolor: "#3f3f3f",
                    ":hover": {
                      bgcolor: "#5f5f5f",
                    },
                    color: "white",
                  }}
                >
                  Details
                </Button>
              </CardActions>
            </Box>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}

export default EventCard;
