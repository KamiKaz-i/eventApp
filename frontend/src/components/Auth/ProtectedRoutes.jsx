import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { userContext } from "../../contexts/userContext.jsx";
import { url } from "../../url.jsx";
export default function ProtectedRoutes() {
  //const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(userContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateUser(token);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function validateUser(token) {
    try {
      const response = await fetch(`${url}/api/users/validate-token`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.log(`server returned status: ${response.status}`);
        setLoading(false);
        return;
      }
      const res = await response.json();

      if (res.username) {
        setUser((prevUser) =>
          prevUser?.username === res.username
            ? prevUser
            : { username: res.username, id: res.id, walletId: res.walletId }
        );
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
  return user ? <Outlet /> : <Navigate to="/login" />;
}
