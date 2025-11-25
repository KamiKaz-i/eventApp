/* eslint-disable react/prop-types */
import { useEffect } from "react";
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const blackInputStyle = {
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiInputBase-input": {
    color: "black",
  },
};

function EventFilter({ eventFilterForm, setEventFilterForm, setSearchParams }) {
  useEffect(() => {
    setSearchParams(eventFilterForm);
  }, [eventFilterForm]);

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: { xs: 3, md: 4 },
        width: "100%",
        maxWidth: 1200,
        gap: { lg: "0.5rem" },
        borderRadius: 0,
        border: "1px solid #e0e0e0",
        bgcolor: "#ffffff",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <TextField
          sx={{
            width: "100%",
            ...blackInputStyle,
          }}
          value={eventFilterForm.search}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            setEventFilterForm({
              ...eventFilterForm,
              [e.target.name]: e.target.value,
            });
          }}
          variant="standard"
          name="search"
          label="Search Events"
          size="medium"
        />
      </Box>

      <Box sx={{ width: "100%", mt: 4, mb: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 300,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "#000",
          }}
        >
          Filters
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 4 },
          alignItems: "flex-end",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <FormControl
            variant="standard"
            sx={{ width: "100%", ...blackInputStyle }}
          >
            <InputLabel id="event-type-label">Category</InputLabel>
            <Select
              labelId="event-type-label"
              value={eventFilterForm.eventType}
              onChange={(e) => {
                setEventFilterForm({
                  ...eventFilterForm,
                  [e.target.name]: e.target.value,
                });
              }}
              name="eventType"
              label="Category"
            >
              <MenuItem value={"All Categories"}>All Categories</MenuItem>
              <MenuItem value={"Concert"}>Concert</MenuItem>
              <MenuItem value={"Gallery"}>Gallery</MenuItem>
              <MenuItem value={"Theatre"}>Theatre</MenuItem>
              <MenuItem value={"Cinema"}>Cinema</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: "100%" }}>
          <TextField
            sx={{ width: "100%", ...blackInputStyle }}
            value={eventFilterForm.priceGt}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              const amount = e.target.value;
              const regex = /^[1-9]\d{0,4}(\.\d{0,2})?$/;
              if (regex.test(amount) || amount === "") {
                setEventFilterForm({
                  ...eventFilterForm,
                  [e.target.name]: amount,
                });
              }
            }}
            variant="standard"
            name="priceGt"
            label="Min Price"
            size="medium"
          />
        </Box>

        <Box sx={{ width: "100%" }}>
          <TextField
            sx={{ width: "100%", ...blackInputStyle }}
            value={eventFilterForm.priceLt}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              const amount = e.target.value;
              const regex = /^[1-9]\d{0,4}(\.\d{0,2})?$/;

              if (regex.test(amount) || amount === "") {
                setEventFilterForm({
                  ...eventFilterForm,
                  [e.target.name]: amount,
                });
              }
            }}
            variant="standard"
            name="priceLt"
            label="Max Price"
            size="medium"
          />
        </Box>

        <Box sx={{ width: "100%", pb: 0.5 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={eventFilterForm.hasTickets}
                onChange={(e) => {
                  setEventFilterForm({
                    ...eventFilterForm,
                    [e.target.name]: !eventFilterForm.hasTickets,
                  });
                }}
                name="hasTickets"
                sx={{
                  color: "#9e9e9e",
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
              />
            }
            label={
              <Typography sx={{ color: "#000", fontWeight: 400 }}>
                Has tickets left
              </Typography>
            }
          />
        </Box>
      </Box>
    </Paper>
  );
}

export default EventFilter;
