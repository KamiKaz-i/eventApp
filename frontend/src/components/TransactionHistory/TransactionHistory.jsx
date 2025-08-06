import { Card, Typography, Divider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { walletContext } from "../../contexts/walletContext";
import TransactionTable from "./TransactionsTable";
import dayjs from "dayjs";
function TransactionHistory() {
  const { wallet } = useContext(walletContext);
  const [transactionHistory, setTransactionHistory] = useState([]);
  useEffect(() => {
    if (!wallet) {
      return;
    }
    const getTransactionHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/api/wallet-transactions/${wallet.id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const transactionHistory = await response.json();

          if (transactionHistory) {
            const formatedTransactionHistory = transactionHistory.map((t) => {
              return {
                ...t,
                createdAt: dayjs(t.createdAt).format("DD/MM/YYYY HH:mm:ss"),
              };
            });
            setTransactionHistory(formatedTransactionHistory);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTransactionHistory();
  }, [wallet]);
  return (
    <Card
      sx={{
        width: { lg: "60%", md: "80%", xs: "100%" },
        marginTop: { lg: 6, xs: 2 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" sx={{ pt: 2, pb: 1 }}>
        Transaction History{" "}
      </Typography>
      <Divider sx={{ width: "100%", borderBottomWidth: 3 }} />
      <Stack sx={{ width: "100%" }}>
        <TransactionTable history={transactionHistory} />
      </Stack>
    </Card>
  );
}

export default TransactionHistory;
