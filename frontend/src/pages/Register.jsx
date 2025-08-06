import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import styles from "./Login.module.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    password: "",
  });

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: registerFormData.username,
          password: registerFormData.password,
        }),
      });
      const res = await response.json();
      console.log(res);

      if (res.userCreated) {
        navigate("/login");
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <Box
      component="form"
      className={styles.container}
      onSubmit={submit}
      bgcolor="#F4F4F4"
      minHeight="100vh"
      height={"100%"}
    >
      <Stack
        direction="column"
        spacing={3}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "inherit",
          p: "0em",
        }}
      >
        <Box
          sx={{
            position: "relative",
            top: "95px",
            left: "-118px",
            width: "80px",
            height: "2px",
            bgcolor: "black",
            float: "left",
          }}
        />
        <Box
          sx={{
            position: "relative",
            top: "69px",
            left: "-158px",
            width: "2px",
            height: "80px",
            bgcolor: "black",
          }}
        />
        <TextField
          onChange={(e) => {
            setRegisterFormData({
              ...registerFormData,
              [e.target.name]: e.target.value,
            });
          }}
          variant="filled"
          name="username"
          label="Username"
          size="medium"
          required={true}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
            "& .MuiFilledInput-root": {
              bgcolor: "inherit",
              ":hover": {
                bgcolor: "inherit",
              },
              "&.Mui-focused": {
                bgcolor: "inherit",
              },
              ":active": {
                bgcolor: "inherit",
              },
              ":focus": {
                bgcolor: "inherit",
              },
              "&:after": {
                borderBottom: "2px solid black",
              },
            },
          }}
        ></TextField>
        <TextField
          onChange={(e) => {
            setRegisterFormData({
              ...registerFormData,
              [e.target.name]: e.target.value,
            });
          }}
          variant="filled"
          name="password"
          label="Password"
          size="large"
          type="password"
          required={true}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
            "& .MuiFilledInput-root": {
              bgcolor: "inherit",
              ":hover": {
                bgcolor: "inherit",
              },
              "&.Mui-focused": {
                bgcolor: "inherit",
              },
              ":active": {
                bgcolor: "inherit",
              },
              ":focus": {
                bgcolor: "inherit",
              },
              "&:after": {
                borderBottom: "2px solid black",
              },
            },
          }}
        ></TextField>

        <Button
          onClick={submit}
          variant="contained"
          type="submit"
          size="large"
          sx={{
            bgcolor: "#3f3f3f",
            ":hover": {
              bgcolor: "#5f5f5f",
            },
            width: "100%",
            mt: "3rem ",
          }}
        >
          Register
        </Button>
        <Box
          sx={{
            position: "relative",
            top: "25px",
            left: "111px",
            width: "80px",
            height: "2px",
            bgcolor: "black",
            float: "left",
          }}
        />
        <Box
          sx={{
            position: "relative",
            top: "-80px",
            left: "150px",
            width: "2px",
            height: "80px",
            bgcolor: "black",
          }}
        />
      </Stack>
    </Box>
  );
}
