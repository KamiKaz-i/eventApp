import Navbar from "../components/Navbar/Navbar";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import styles from "./CreateEvent.module.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import Select from "@mui/material/Select";
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
  const [animationClass, setAnimationClass] = useState("");
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
  function animatePrevQuestion() {
    setAnimationClass(styles.animatePrevQuestion);
  }

  function animateNextQuestion() {
    setAnimationClass(styles.animateNextQuestion);
  }
  function handleNextAnimationEnd() {
    setAnimationClass("");
  }
  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { lg: "60%", md: "80%", s: "100%", xs: "100%" },
          flex: 1,
        }}
      >
        {questionIndex > 0 ? (
          <Button
            type="button"
            onClick={() => {
              animatePrevQuestion();
              setQuestionIndex((questionIndex) => questionIndex - 1);
            }}
            sx={{
              height: "64px",
              borderRadius: "100%",
              margin: "0",
              padding: "0",
              color: "black",
              position: "relative",
              top: "-4.5rem",
            }}
          >
            <ArrowBackIcon fontSize="large"></ArrowBackIcon>
          </Button>
        ) : (
          <Button
            disabled
            sx={{
              height: "64px",
              width: "64px",
              margin: "0",
              padding: "0",
              color: "black",
              position: "relative",
              top: "-4.5rem",
            }}
          ></Button>
        )}

        <Stack
          sx={{
            height: "500px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {questionIndex === 0 && (
            <>
              <Typography
                variant="overline"
                className={animationClass}
                onAnimationEnd={handleNextAnimationEnd}
                sx={{
                  fontWeight: 300,
                  fontSize: { lg: 30, md: 23, s: 40, xs: 17 },
                  position: "relative",
                  top: "-13rem",
                  textAlign: "center",
                }}
              >
                {questionArray[questionIndex]}
              </Typography>
              <TextField
                sx={{
                  width: { lg: "400px", md: "300px", s: "250px", xs: "250px" },
                  position: "relative",
                  top: "-5rem",
                }}
                InputProps={{
                  inputProps: {
                    style: { textAlign: "center" },
                  },
                }}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                value={createEventForm.title}
                required
                variant="standard"
                color="black"
                name="title"
                size="medium"
              ></TextField>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 300,
                  fontSize: 14,
                  position: "relative",
                  bottom: {
                    lg: "-8rem",
                    md: "-7rem",
                    s: "-6rem",
                    xs: "-5rem",
                  },
                }}
              >
                Question {questionIndex + 1} of {questionArray.length}
              </Typography>
            </>
          )}
          {questionIndex === 1 && (
            <>
              <Typography
                className={animationClass}
                variant="overline"
                sx={{
                  fontWeight: 300,
                  fontSize: { lg: 30, md: 23, s: 40, xs: 17 },
                  position: "relative",
                  top: "-13rem",
                  textAlign: "center",
                }}
              >
                {questionArray[questionIndex]}
              </Typography>
              <TextField
                sx={{
                  width: { lg: "400px", md: "300px", s: "250px", xs: "250px" },
                  position: "relative",
                  top: "-5rem",
                }}
                InputProps={{
                  inputProps: {
                    style: { textAlign: "center" },
                  },
                }}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                required
                value={createEventForm.description}
                variant="standard"
                name="description"
                size="medium"
                color="black"
              ></TextField>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 300,
                  fontSize: 14,
                  position: "relative",
                  bottom: {
                    lg: "-8rem",
                    md: "-7rem",
                    s: "-6rem",
                    xs: "-5rem",
                  },
                }}
              >
                Question {questionIndex + 1} of {questionArray.length}
              </Typography>
            </>
          )}
          {questionIndex === 2 && (
            <>
              <Typography
                className={animationClass}
                variant="overline"
                sx={{
                  fontWeight: 300,
                  fontSize: { lg: 30, md: 23, s: 40, xs: 17 },
                  position: "relative",
                  top: "-13rem",
                  textAlign: "center",
                }}
              >
                {questionArray[questionIndex]}
              </Typography>

              <FormControl
                variant="standard"
                color="black"
                sx={{
                  width: { lg: "400px", md: "300px", s: "250px", xs: "250px" },
                  position: "relative",
                  top: "-5rem",
                }}
              >
                <Select
                  sx={{
                    "& .MuiSelect-select": {
                      textAlign: "center",
                    },
                  }}
                  onChange={(e) => {
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
                >
                  <MenuItem value={"Concert"}>Concert</MenuItem>
                  <MenuItem value={"Gallery"}>Gallery</MenuItem>
                  <MenuItem value={"Theatre"}>Theatre</MenuItem>
                  <MenuItem value={"Cinema"}>Cinema</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 300,
                  fontSize: 14,
                  position: "relative",
                  bottom: {
                    lg: "-8rem",
                    md: "-7rem",
                    s: "-6rem",
                    xs: "-5rem",
                  },
                }}
              >
                Question {questionIndex + 1} of {questionArray.length}
              </Typography>
            </>
          )}
          {questionIndex === 3 && (
            <>
              <Typography
                className={animationClass}
                variant="overline"
                sx={{
                  fontWeight: 300,
                  fontSize: { lg: 30, md: 23, s: 40, xs: 17 },
                  position: "relative",
                  top: "-13rem",
                  textAlign: "center",
                }}
              >
                {questionArray[questionIndex]}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
                  minDate={dayjs()}
                  defaultValue={dayjs()}
                  slotProps={{
                    textField: {
                      required: true,
                      readOnly: true,
                      variant: "standard",
                      inputProps: {
                        style: { textAlign: "center" },
                      },
                    },
                  }}
                  sx={{
                    width: {
                      lg: "400px",
                      md: "300px",
                      s: "250px",
                      xs: "250px",
                    },
                    position: "relative",
                    top: "-5rem",
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
                      date: `${newValue.$M + 1}/${newValue.$D}/${newValue.$y}`,
                    });

                    setIsInputEmpty({
                      ...isInputEmpty,
                      [questionIndex]: false,
                    });
                  }}
                />
              </LocalizationProvider>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 300,
                  fontSize: 14,
                  position: "relative",
                  bottom: {
                    lg: "-8rem",
                    md: "-7rem",
                    s: "-6rem",
                    xs: "-5rem",
                  },
                }}
              >
                Question {questionIndex + 1} of {questionArray.length}
              </Typography>
            </>
          )}
          {questionIndex === 4 && (
            <>
              <Typography
                className={animationClass}
                variant="overline"
                sx={{
                  fontWeight: 300,
                  fontSize: { lg: 30, md: 23, s: 40, xs: 17 },
                  position: "relative",
                  top: "-13rem",
                  textAlign: "center",
                }}
              >
                {questionArray[questionIndex]}
              </Typography>
              <TextField
                sx={{
                  width: { lg: "400px", md: "300px", s: "250px", xs: "250px" },
                  position: "relative",
                  top: "-5rem",
                }}
                InputProps={{
                  inputProps: {
                    style: { textAlign: "center" },
                  },
                }}
                value={createEventForm.totalTickets}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
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
                variant="standard"
                name="totalTickets"
                size="medium"
                color="black"
                required
              ></TextField>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 300,
                  fontSize: 14,
                  position: "relative",
                  bottom: {
                    lg: "-8rem",
                    md: "-7rem",
                    s: "-6rem",
                    xs: "-5rem",
                  },
                }}
              >
                Question {questionIndex + 1} of {questionArray.length}
              </Typography>
            </>
          )}
          {questionIndex === 5 && (
            <>
              <Typography
                className={animationClass}
                variant="overline"
                sx={{
                  fontWeight: 300,
                  fontSize: { lg: 30, md: 23, s: 40, xs: 17 },
                  position: "relative",
                  top: "-13rem",
                }}
              >
                {questionArray[questionIndex]}
              </Typography>
              <TextField
                sx={{
                  width: { lg: "400px", md: "300px", s: "250px", xs: "250px" },
                  position: "relative",
                  top: "-5rem",
                }}
                InputProps={{
                  inputProps: {
                    style: { textAlign: "center" },
                  },
                }}
                value={createEventForm.price}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
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
                variant="standard"
                name="price"
                size="medium"
                color="black"
              ></TextField>
              <Button
                disabled={isInputEmpty[questionIndex]}
                variant="contained"
                type="submit"
                size="large"
                sx={{
                  position: "relative",
                  bottom: "-3rem",
                  width: "150px",
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
            type="button"
            disabled={isInputEmpty[questionIndex]}
            onClick={() => {
              animateNextQuestion();

              setQuestionIndex((prev) => prev + 1);
            }}
            sx={{
              height: "64px",
              borderRadius: "100%",
              margin: "0",
              padding: "0",
              color: "black",
              position: "relative",
              top: "-4.5rem",
            }}
          >
            <ArrowForwardIcon fontSize="large"></ArrowForwardIcon>
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
      </Box>
    </Box>
  );
}
