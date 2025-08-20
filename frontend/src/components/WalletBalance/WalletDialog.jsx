/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
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
          console.log(actionType);

          getWallet();
        }
      } catch (error) {
        console.log(error);
      }
    };
    walletAction();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "white", bgcolor: "#3d3e40", pt: 3 }}>
        Select Action
      </DialogTitle>
      <DialogContent sx={{ padding: 0, bgcolor: "#3d3e40" }}>
        <Stack spacing={2} alignItems="center" sx={{ bgcolor: "#3d3e40" }}>
          <Stack
            direction="column"
            alignItems={"center"}
            sx={{ width: "100%" }}
          >
            <Button
              sx={{
                color: "white",
                height: 60,
                borderRadius: 0,
                border: 0,
                width: "80%",
                bgcolor: "#3d3e40",
                ":hover": {
                  bgcolor: "#17181a",
                },
              }}
              onClick={() => handleAction("deposit")}
            >
              <AddIcon></AddIcon>
              Deposit
            </Button>
            <Divider variant="middle"></Divider>
            <Button
              sx={{
                color: "white",
                height: 60,
                borderRadius: 0,
                bgcolor: "#3d3e40",
                border: 0,
                width: "80%",
                ":hover": {
                  bgcolor: "#17181a",
                },
              }}
              onClick={() => handleAction("withdraw")}
            >
              <RemoveIcon></RemoveIcon>
              Withdraw
            </Button>
          </Stack>

          {actionType && (
            <>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                      borderWidth: 1,
                    },
                  },
                  borderRadius: 0,
                  width: "80%",
                  bgcolor: "#17181a",
                  "& .MuiInputBase-input": {
                    color: "white",
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
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ bgcolor: "#3d3e40", paddingTop: 5 }}>
        <Button sx={{ color: "white" }} onClick={handleClose}>
          Cancel
        </Button>
        {actionType && (
          <Button
            onClick={handleConfirm}
            variant="contained"
            color={actionType === "deposit" ? "success" : "error"}
          >
            {actionType}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
