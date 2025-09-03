/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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
function EventFilter({
  eventFilterForm,
  setEventFilterForm,
  searchParams,
  setSearchParams,
}) {
  //   const [eventFilterForm, setEventFilterForm] = useState({
  //     search: "",
  //     priceGt: 0,
  //     priceLt: 0,
  //     eventType: "All Categories",
  //     hasTickets: true,
  //   });
  useEffect(() => {
    setSearchParams(eventFilterForm);
  }, [eventFilterForm]);
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: { lg: "column" },
        p: "1.5rem",
        width: "100%",
        maxWidth: 1150,
        gap: "0.5rem",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <TextField
          sx={{ width: { lg: "100%", md: "100%", xs: "100%" } }}
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
          label="Search"
          size="medium"
          color="black"
        ></TextField>
      </Box>
      <Box sx={{ width: "100%", mt: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { lg: "row" },
          gap: "4rem",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <FormControl
            color="black"
            sx={{ width: { lg: "100%", md: "50%", xs: "75%" } }}
          >
            <InputLabel></InputLabel>
            <Select
              value={eventFilterForm.eventType}
              sx={{ width: "100%" }}
              onChange={(e) => {
                setEventFilterForm({
                  ...eventFilterForm,
                  [e.target.name]: e.target.value,
                });
              }}
              name="eventType"
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
            sx={{ width: { lg: "100%", md: "100%", xs: "100%" } }}
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
            label="Price (From)"
            size="medium"
            color="black"
          ></TextField>
        </Box>
        <Box sx={{ width: "100%" }}>
          <TextField
            sx={{ width: { lg: "100%", md: "100%", xs: "100%" } }}
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
            label="Price (To)"
            size="medium"
            color="black"
          ></TextField>
        </Box>
        <Box sx={{ width: "100%" }}>
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
              />
            }
            label="Has tickets left"
          />
        </Box>
      </Box>
    </Paper>
  );
}

export default EventFilter;
