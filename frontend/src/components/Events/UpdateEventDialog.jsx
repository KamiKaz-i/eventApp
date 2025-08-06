/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
export default function UpdateEventDialog({
  open,
  handleClose,
  event,
  getEvents,
}) {
  const [updateEventForm, setUpdateEventForm] = useState({
    title: event.title,
    description: event.description,
    date: dayjs(),
    location: "",
    price: event.price,
    type: event.type,
  });

  const handleConfirm = () => {
    handleClose();
    const updateEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/api/events/${event.id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: updateEventForm.title,
              description: updateEventForm.description,
              date: updateEventForm.date,
              price: updateEventForm.price,
              type: updateEventForm.type,
            }),
          }
        );

        if (response.ok) {
          getEvents();
        }
      } catch (error) {
        console.log(error);
      }
    };
    updateEvent();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DialogTitle
        sx={{
          color: "black",
          bgcolor: "#e0e0e0",
          pt: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        Update Event
      </DialogTitle>
      <DialogContent sx={{ padding: 0, bgcolor: "#F0F0e0", width: "500px" }}>
        <Stack
          spacing={3}
          alignItems="center"
          sx={{ p: 3, bgcolor: "#e0e0e0" }}
        >
          <TextField
            defaultValue={updateEventForm.title}
            sx={{ width: { lg: "60%", xs: "75%" } }}
            onChange={(e) => {
              setUpdateEventForm({
                ...updateEventForm,
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
            defaultValue={updateEventForm.description}
            sx={{ width: { lg: "60%", xs: "75%" } }}
            onChange={(e) => {
              setUpdateEventForm({
                ...updateEventForm,
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
          <FormControl color="black" sx={{ width: { lg: "60%", xs: "75%" } }}>
            <InputLabel id="Event-type">Event Type</InputLabel>
            <Select
              onChange={(e) => {
                console.log(e.target.name);
                setUpdateEventForm({
                  ...updateEventForm,
                  [e.target.name]: e.target.value,
                });
              }}
              value={updateEventForm.type}
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
                width: { lg: "60%", xs: "75%" },
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
                setUpdateEventForm({
                  ...updateEventForm,
                  date: `${newValue.$W}/${newValue.$D}/${newValue.$y}`,
                });
              }}
              label="Event Date"
            />
          </LocalizationProvider>
          <TextField
            required
            sx={{ width: { lg: "60%", xs: "75%" } }}
            value={updateEventForm.price}
            onChange={(e) => {
              const amount = e.target.value;
              const regex = /^[1-9]\d{0,4}(\.\d{0,2})?$/;
              if (regex.test(amount) || amount === "") {
                setUpdateEventForm({
                  ...updateEventForm,
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
        </Stack>
      </DialogContent>
      <DialogActions sx={{ bgcolor: "#e0e0e0", paddingTop: 5 }}>
        <Button
          sx={{
            color: "white",
            bgcolor: "#3f3f3f",
            ":hover": {
              bgcolor: "#5f5f5f",
            },
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{
            color: "white",
            bgcolor: "#3f3f3f",
            ":hover": {
              bgcolor: "#5f5f5f",
            },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
