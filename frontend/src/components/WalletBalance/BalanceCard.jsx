import { useEffect, useState } from "react";
import { Card, Typography, Box, Button, Stack } from "@mui/material";
import WalletDialog from "./WalletDialog.jsx";
import { useContext } from "react";
import { walletContext } from "../../contexts/walletContext";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { url } from "../../url.jsx";

function BalanceCard({ setError }) {
  const { wallet, setWallet } = useContext(walletContext);
  const [open, setOpen] = useState(false);

  const getWallet = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/api/wallets`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const wallet = await response.json();
        setWallet(wallet);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <Card
      elevation={0}
      sx={{
        width: { lg: "60%", md: "80%", xs: "100%" },
        margin: { lg: "24px auto", xs: "16px 0" },
        p: 3,
        borderRadius: 0,
        border: "1px solid #e0e0e0",
        bgcolor: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "all 0.3s ease",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="flex-end"
      >
        <AccountBalanceIcon color="black" sx={{ fontSize: 25 }} />
        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            Account Balance
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 400 }}>
            {wallet?.balance} $
          </Typography>
        </Box>
      </Stack>
      <Box>
        <Typography variant="subtitle1" color="text.secondary">
          Pending Balance
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 200 }}>
          {wallet?.pendingBalance} $
        </Typography>
      </Box>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{
          px: 3,
          py: 1.5,
          borderRadius: 0,
          textTransform: "none",
          fontWeight: 600,
          color: "black",
          borderColor: "black",
          ":hover": {
            bgcolor: "black",
            color: "white",
            borderColor: "black",
          },
        }}
      >
        Manage Funds
      </Button>

      <WalletDialog
        open={open}
        handleClose={() => setOpen(false)}
        getWallet={getWallet}
        walletId={wallet?.id}
        setError={setError}
      />
    </Card>
  );
}

export default BalanceCard;
