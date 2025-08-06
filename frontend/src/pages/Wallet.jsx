import { Stack, Box } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";

import BalanceCard from "../components/WalletBalance/BalanceCard";
import TransactionHistory from "../components/TransactionHistory/TransactionHistory";
function Wallet() {
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
        <BalanceCard />
        <TransactionHistory />
      </Stack>
    </Box>
  );
}

export default Wallet;
