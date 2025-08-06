import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
export default function UnprotectedRoutes() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateUser(token);
    } else {
      setLoading(false);
    }
  }, []);
  async function validateUser(token) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/validate-token`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        console.log(`server returned status: ${response.status}`);
        setLoading(false);
        return;
      }
      const res = await response.json();
      if (res.username) {
        setUser(res.username);
      } else {
        console.log("failed to auth");
        localStorage.removeItem("token");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return user ? <Navigate to="/events" /> : <Outlet />;
}
