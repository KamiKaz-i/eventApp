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
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuItem from "@mui/material/MenuItem";
import { url } from "../url";
export default function CreateEvent() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionArray] = useState([
    "What will be the name of event?",
    "What are the event details?",
    "What kind of event are you planning?",
    "When is the event?",
    "How many people are you expecting?",
    "How much is it gonna cost?",
  ]);
  let navigate = useNavigate();
  const [selectOption, setSelectOption] = useState("Other");
  const [createEventForm, setCreateEventForm] = useState({
    title: "",
    description: "",
    date: dayjs(),
    totalTickets: 0,
    type: "gallery",
    price: 0,
  });
  const [isInputEmpty, setIsInputEmpty] = useState(() => {
    let tmp = {};
    questionArray.forEach((el, index) => {
      tmp[index] = true;
    });
    return tmp;
  });
  async function submit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await fetch(`${url}/api/events`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title: createEventForm.title,
          description: createEventForm.description,
          date: createEventForm.date,
          total_tickets: createEventForm.totalTickets,
          price: createEventForm.price,
          type: createEventForm.type,
        }),
      });
      navigate("/my-events");
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
        sx={{
          width: "100%",
          maxWidth: "800px",
          mx: "auto",
          p: { sm: 3, md: 4 },

          flex: 1,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "500px",
            p: 4,
            borderRadius: 3,
            bgcolor: "background.paper",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          {questionIndex > 0 ? (
            <Button
              onClick={() => {
                setQuestionIndex((questionIndex) => questionIndex - 1);
              }}
              sx={{
                height: "64px",
                borderRadius: "100%",
                margin: "0",
                padding: "0",
                color: "black",
              }}
            >
              <ArrowBackIcon sx={{ position: "relative" }}></ArrowBackIcon>
            </Button>
          ) : (
            <Box
              sx={{
                height: "64px",
                width: "64px",
                margin: "0px",
                padding: "0px",
              }}
            ></Box>
          )}

          <Stack
            spacing={{ lg: 3, xs: 3, sm: 2 }}
            useFlexGap
            sx={{
              height: "500px",
              flex: 1,
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mt: 10,
                mb: 4,
                fontWeight: 400,
                color: "black",
              }}
            >
              Event info
            </Typography>
            {questionIndex === 0 && (
              <>
                <p>{questionArray[questionIndex]}</p>
                <TextField
                  sx={{ width: { lg: "50%", md: "50%", xs: "75%" } }}
                  onChange={(e) => {
                    setCreateEventForm({
                      ...createEventForm,
                      [e.target.name]: e.target.value,
                    });
                    e.target.value != ""
                      ? setIsInputEmpty({
                          ...isInputEmpty,
                          [questionIndex]: false,
                        })
                      : setIsInputEmpty({
                          ...isInputEmpty,
                          [questionIndex]: true,
                        });
                  }}
                  value={createEventForm.title}
                  required
                  variant="outlined"
                  color="black"
                  name="title"
                  label="Title"
                  size="medium"
                ></TextField>
              </>
            )}
            {questionIndex === 1 && (
              <>
                <p>{questionArray[questionIndex]}</p>
                <TextField
                  sx={{ width: { lg: "50%", md: "50%", xs: "75%" } }}
                  onChange={(e) => {
                    setCreateEventForm({
                      ...createEventForm,
                      [e.target.name]: e.target.value,
                    });
                    e.target.value != ""
                      ? setIsInputEmpty({
                          ...isInputEmpty,
                          [questionIndex]: false,
                        })
                      : setIsInputEmpty({
                          ...isInputEmpty,
                          [questionIndex]: true,
                        });
                  }}
                  required
                  value={createEventForm.description}
                  variant="outlined"
                  name="description"
                  label="Description"
                  size="medium"
                  color="black"
                ></TextField>
              </>
            )}
            {questionIndex === 2 && (
              <>
                <p>{questionArray[questionIndex]}</p>
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
                      e.target.value != ""
                        ? setIsInputEmpty({
                            ...isInputEmpty,
                            [questionIndex]: false,
                          })
                        : setIsInputEmpty({
                            ...isInputEmpty,
                            [questionIndex]: true,
                          });
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
              </>
            )}
            {questionIndex === 3 && (
              <>
                <p>{questionArray[questionIndex]}</p>
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
                      console.log(newValue);
                      setCreateEventForm({
                        ...createEventForm,
                        date: `${newValue.$M + 1}/${newValue.$D}/${
                          newValue.$y
                        }`,
                      });

                      setIsInputEmpty({
                        ...isInputEmpty,
                        [questionIndex]: false,
                      });
                    }}
                    label="Event Date"
                  />
                </LocalizationProvider>
              </>
            )}
            {questionIndex === 4 && (
              <>
                <p>{questionArray[questionIndex]}</p>
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
                      e.target.value != ""
                        ? setIsInputEmpty({
                            ...isInputEmpty,
                            [questionIndex]: false,
                          })
                        : setIsInputEmpty({
                            ...isInputEmpty,
                            [questionIndex]: true,
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
              </>
            )}
            {questionIndex === 5 && (
              <>
                <p>{questionArray[questionIndex]}</p>
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
                      e.target.value != ""
                        ? setIsInputEmpty({
                            ...isInputEmpty,
                            [questionIndex]: false,
                          })
                        : setIsInputEmpty({
                            ...isInputEmpty,
                            [questionIndex]: true,
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
                  disabled={isInputEmpty[questionIndex]}
                  variant="contained"
                  type="submit"
                  size="large"
                  onClick={() => {
                    console.log(createEventForm);
                  }}
                  sx={{
                    position: "relative",
                    bottom: "0px",
                    px: 6,
                    py: 1.5,
                    mt: 3,
                    borderRadius: 1,
                    textTransform: "none",
                    fontWeight: 600,
                    bgcolor: "#3f3f3f",
                    ":hover": {
                      bgcolor: "#5f5f5f",
                    },
                  }}
                >
                  Create
                </Button>
              </>
            )}
          </Stack>
          {questionIndex < questionArray.length - 1 ? (
            <Button
              disabled={isInputEmpty[questionIndex]}
              onClick={() => {
                setQuestionIndex((questionIndex) => questionIndex + 1);
              }}
              sx={{
                height: "64px",
                borderRadius: "100%",
                margin: "0",
                padding: "0",
                color: "black",
              }}
            >
              <ArrowForwardIcon></ArrowForwardIcon>
            </Button>
          ) : (
            <Box
              sx={{
                height: "64px",
                width: "64px",
                margin: "0px",
                padding: "0px",
              }}
            ></Box>
          )}
        </Paper>
      </Stack>
    </Box>
  );
}
