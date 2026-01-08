import { Stack, Box, Alert } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import BalanceCard from "../components/WalletBalance/BalanceCard";
import TransactionHistory from "../components/TransactionHistory/TransactionHistory";
function Wallet() {
  const [error, setError] = useState(null);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#F4F4F4",
      }}
    >
      <Navbar>wallet</Navbar>
      <Stack
        spacing={{ xs: 1, sm: 1 }}
        useFlexGap
        sx={{
          flex: 1,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {error && (
          <Alert
            severity="error"
            sx={{
              width: "80%",
              mb: 2,
              mt: 3,
              borderRadius: 0,
            }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}
        <BalanceCard setError={setError} />
        <TransactionHistory />
      </Stack>
    </Box>
  );
}

export default Wallet;
