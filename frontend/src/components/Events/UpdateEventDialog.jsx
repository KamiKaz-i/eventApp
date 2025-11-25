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
import { url } from "../../url.jsx";

const inputStyle = {
  width: { lg: "80%", xs: "100%" },
  "& label.Mui-focused": { color: "black" },
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
};

export default function UpdateEventDialog({
  open,
  handleClose,
  event,
  getEvents,
}) {
  const [updateEventForm, setUpdateEventForm] = useState({
    title: event.title,
    description: event.description,
    date: dayjs(event.date) || dayjs(),
    location: "",
    price: event.price,
    type: event.type,
  });

  const handleConfirm = () => {
    handleClose();
    const updateEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${url}/api/events/${event.id}`, {
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
        });

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
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 0,
          border: "1px solid #000",
          width: "100%",
          maxWidth: "600px",
          m: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 300,
          textTransform: "uppercase",
          letterSpacing: "1px",
          borderBottom: "1px solid #eee",
          pb: 2,
          bgcolor: "white",
          color: "black",
        }}
      >
        Update Event
      </DialogTitle>

      <DialogContent sx={{ padding: 0, bgcolor: "white" }}>
        <Stack
          spacing={3}
          alignItems="center"
          sx={{
            p: 4,
            bgcolor: "white",
            width: "100%",
          }}
        >
          <TextField
            defaultValue={updateEventForm.title}
            sx={inputStyle}
            onChange={(e) => {
              setUpdateEventForm({
                ...updateEventForm,
                [e.target.name]: e.target.value,
              });
            }}
            required
            variant="outlined"
            name="title"
            label="Title"
            size="medium"
          />
          <TextField
            defaultValue={updateEventForm.description}
            sx={inputStyle}
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
          />
          <FormControl sx={inputStyle}>
            <InputLabel
              id="Event-type"
              sx={{ "&.Mui-focused": { color: "black" } }}
            >
              Event Type
            </InputLabel>
            <Select
              labelId="Event-type"
              onChange={(e) => {
                setUpdateEventForm({
                  ...updateEventForm,
                  [e.target.name]: e.target.value,
                });
              }}
              value={updateEventForm.type}
              name="type"
              label="Event Type"
              sx={{
                borderRadius: 0,
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
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
              defaultValue={dayjs(event.date)}
              slotProps={{
                textField: {
                  required: true,
                  readOnly: true,
                  sx: inputStyle,
                },
              }}
              name="date"
              onChange={(newValue) => {
                setUpdateEventForm({
                  ...updateEventForm,
                  date: newValue,
                });
              }}
              label="Event Date"
            />
          </LocalizationProvider>

          <TextField
            required
            sx={inputStyle}
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
          />
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          pb: 4,
          pt: 2,
          gap: 2,
          bgcolor: "white",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "black",
            borderRadius: 0,
            textTransform: "uppercase",
            fontWeight: 500,
            px: 4,
            ":hover": {
              bgcolor: "#f5f5f5",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleConfirm}
          variant="outlined"
          sx={{
            px: 4,
            py: 1,
            borderRadius: 0,
            color: "black",
            borderColor: "black",
            textTransform: "uppercase",
            fontWeight: "bold",
            ":hover": {
              bgcolor: "black",
              color: "white",
              borderColor: "black",
            },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
