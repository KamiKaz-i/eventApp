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
  Box,
} from "@mui/material";
import { url } from "../../url.jsx";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function WalletDialog({
  open,
  handleClose,
  getWallet,
  walletId,
}) {
  const [amount, setAmount] = useState("");
  const [actionType, setActionType] = useState(null);

  const handleAction = (type) => {
    setActionType(type);
  };

  const handleConfirm = () => {
    handleClose();
    const walletAction = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${url}/api/wallet-transactions/${actionType}`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              walletId: walletId,
              amount: amount,
              transactionType: actionType,
            }),
          }
        );
        if (response.ok) {
          getWallet();
        }
      } catch (error) {
        console.log(error);
      }
    };
    walletAction();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 0,
          border: "1px solid #000",
          bgcolor: "#ffffff",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "black",
          bgcolor: "#ffffff",
          pt: 3,
          borderBottom: "1px solid #eee",
          textAlign: "center",
        }}
      >
        Select Action
      </DialogTitle>

      <DialogContent sx={{ padding: 4, bgcolor: "#ffffff" }}>
        <Stack spacing={3} alignItems="center">
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: "100%", justifyContent: "center" }}
          >
            <Button
              sx={{
                height: 50,
                borderRadius: 0,
                border: "1px solid black",
                width: "50%",
                // Conditional styling for selected state
                bgcolor: actionType === "deposit" ? "black" : "white",
                color: actionType === "deposit" ? "white" : "black",
                ":hover": {
                  bgcolor: actionType === "deposit" ? "#333" : "#f5f5f5",
                  borderColor: "black",
                },
              }}
              onClick={() => handleAction("deposit")}
              startIcon={<AddIcon />}
            >
              Deposit
            </Button>

            <Button
              sx={{
                height: 50,
                borderRadius: 0,
                border: "1px solid black",
                width: "50%",
                // Conditional styling for selected state
                bgcolor: actionType === "withdraw" ? "black" : "white",
                color: actionType === "withdraw" ? "white" : "black",
                ":hover": {
                  bgcolor: actionType === "withdraw" ? "#333" : "#f5f5f5",
                  borderColor: "black",
                },
              }}
              onClick={() => handleAction("withdraw")}
              startIcon={<RemoveIcon />}
            >
              Withdraw
            </Button>
          </Stack>

          {actionType && (
            <Box sx={{ width: "100%", pt: 2 }}>
              <TextField
                autoFocus
                fullWidth
                label={
                  actionType === "deposit"
                    ? "Amount to Deposit"
                    : "Amount to Withdraw"
                }
                sx={{
                  "& label.Mui-focused": { color: "black" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
                type="text"
                value={amount}
                onChange={(e) => {
                  const amount = e.target.value;
                  const regex = /^[1-9]\d{0,6}(\.\d{0,2})?$/;
                  if (regex.test(amount) || amount === "") {
                    setAmount(amount);
                  }
                }}
              />
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{ bgcolor: "#ffffff", p: 3, justifyContent: "center", gap: 2 }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "black",
            borderRadius: 0,
            ":hover": { bgcolor: "#f5f5f5" },
          }}
        >
          Cancel
        </Button>

        {actionType && (
          <Button
            onClick={handleConfirm}
            variant="outlined"
            sx={{
              px: 4,
              borderRadius: 0,
              color: "black",
              borderColor: "black",
              ":hover": {
                bgcolor: "black",
                color: "white",
                borderColor: "black",
              },
            }}
          >
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
