import Navbar from "../components/Navbar/Navbar";
import {
  Box,
  Stack,
  Paper,
  TextField,
  Typography,
  Button,
  FormControl,
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../contexts/userContext";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import MenuItem from "@mui/material/MenuItem";
export default function CreateEvent() {
  const { user } = useContext(userContext);
  const [selectOption, setSelectOption] = useState("Other");
  const [createEventForm, setCreateEventForm] = useState({
    title: "",
    description: "",
    date: dayjs(),
    totalTickets: 1,
    location: "",
    type: "gallery",
    price: 1,
  });
  async function submit(e) {
    console.log(user);
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/events`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          organizer_id: user.id,
          title: createEventForm.title,
          description: createEventForm.description,
          date: createEventForm.date,
          total_tickets: createEventForm.totalTickets,
          location: createEventForm.location,
          price: createEventForm.price,
          type: createEventForm.type,
        }),
      });
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Navbar />
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          width: "100%",
          maxWidth: "800px",
          mx: "auto",
          p: { xs: 2, sm: 3, md: 4 },
          flex: 1,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            p: 4,
            borderRadius: 3,
            bgcolor: "background.paper",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Stack
            spacing={{ lg: 3, xs: 3, sm: 2 }}
            useFlexGap
            sx={{
              flex: 1,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: 400,
                color: "black",
              }}
            >
              Event info
            </Typography>

            <TextField
              sx={{ width: { lg: "50%", md: "50%", xs: "75%" } }}
              onChange={(e) => {
                setCreateEventForm({
                  ...createEventForm,
                  [e.target.name]: e.target.value,
                });
              }}
              required
              variant="outlined"
              color="black"
              name="title"
              label="Title"
              size="medium"
            ></TextField>
            <TextField
              sx={{ width: { lg: "50%", md: "50%", xs: "75%" } }}
              onChange={(e) => {
                setCreateEventForm({
                  ...createEventForm,
                  [e.target.name]: e.target.value,
                });
              }}
              required
              variant="outlined"
              name="description"
              label="Description"
              size="medium"
              color="black"
            ></TextField>
            <FormControl
              color="black"
              sx={{ width: { lg: "50%", md: "50%", xs: "75%" } }}
            >
              <InputLabel id="Event-type">Event Type</InputLabel>
              <Select
                onChange={(e) => {
                  console.log(e.target.name);
                  setCreateEventForm({
                    ...createEventForm,
                    [e.target.name]: e.target.value,
                  });
                  setSelectOption(e.target.value);
                }}
                value={selectOption}
                name="type"
                label="type"
              >
                <MenuItem value={"Concert"}>Concert</MenuItem>
                <MenuItem value={"Gallery"}>Gallery</MenuItem>
                <MenuItem value={"Theatre"}>Theatre</MenuItem>
                <MenuItem value={"Cinema"}>Cinema</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disablePast
                minDate={dayjs()}
                defaultValue={dayjs()}
                slotProps={{
                  textField: {
                    required: true,
                    readOnly: true,
                  },
                }}
                sx={{
                  width: { lg: "50%", md: "50%", xs: "75%" },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "2px solid black",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                }}
                name="date"
                onChange={(newValue) => {
                  setCreateEventForm({
                    ...createEventForm,
                    date: `${newValue.$W}/${newValue.$D}/${newValue.$y}`,
                  });
                }}
                label="Event Date"
              />
            </LocalizationProvider>
            <TextField
              sx={{ width: { lg: "50%", md: "50%", xs: "75%" } }}
              value={createEventForm.totalTickets}
              onChange={(e) => {
                const amount = e.target.value;
                const regex = /^[1-9]\d{0,4}$/;
                if (regex.test(amount) || amount === "") {
                  setCreateEventForm({
                    ...createEventForm,
                    [e.target.name]: amount,
                  });
                }
              }}
              variant="outlined"
              name="totalTickets"
              label="Total Tickets"
              size="medium"
              color="black"
              required
            ></TextField>
            <TextField
              required
              sx={{ width: { lg: "50%", md: "50%", xs: "75%" } }}
              value={createEventForm.price}
              onChange={(e) => {
                const amount = e.target.value;
                const regex = /^[1-9]\d{0,4}(\.\d{0,2})?$/;
                if (regex.test(amount) || amount === "") {
                  setCreateEventForm({
                    ...createEventForm,
                    [e.target.name]: amount,
                  });
                }
              }}
              variant="outlined"
              name="price"
              label="Price"
              size="medium"
              color="black"
            ></TextField>
            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{
                bgcolor: "#3f3f3f",
                ":hover": {
                  bgcolor: "#5f5f5f",
                },
                width: { lg: "12%", md: "20%", xs: "35%" },
                mt: "3rem ",
              }}
            >
              Create
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
