/* eslint-disable react/prop-types */
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import { useContext, useState } from "react";
import { userContext } from "../../contexts/userContext";
import { orderContext } from "../../contexts/orderContext";
import { walletContext } from "../../contexts/walletContext.jsx";
import { url } from "../../url.jsx";

export default function OrderSummary() {
  const { wallet } = useContext(walletContext);

  const { user } = useContext(userContext);
  const [, , fetchOrders, order, setOrder] = useContext(orderContext);
  const [error, setError] = useState(null);

  const handlePurchase = async () => {
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/api/wallet-transactions/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          walletId: user.walletId,
          transactionType: "purchase",
          orderId: order.id,
        }),
      });

      if (!response.ok) {
        const res = await response.json();

        throw new Error(res.message);
      }

      await fetchOrders();
      setOrder(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 0,
        border: "1px solid #e0e0e0",
        bgcolor: "#ffffff",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          fontWeight="bold"
          sx={{ color: "black" }}
        >
          Order Summary
        </Typography>

        <List dense>
          <Divider component="li" sx={{ my: 1, borderColor: "#e0e0e0" }} />
          <ListItem sx={{ py: 1 }}>
            <ListItemText
              primary="Total"
              primaryTypographyProps={{
                style: { fontWeight: 500, color: "black", fontSize: 16 },
              }}
            />
            <Typography sx={{ color: "black", fontWeight: 500, fontSize: 16 }}>
              {order?.total_price || 0}$
            </Typography>
          </ListItem>
        </List>
      </CardContent>

      <CardActions sx={{ p: 2, flexDirection: "column" }}>
        {error && (
          <Alert
            severity="error"
            sx={{
              width: "100%",
              mb: 2,
              borderRadius: 0,
            }}
          >
            {error}
          </Alert>
        )}

        <Button
          fullWidth
          variant="outlined"
          size="large"
          onClick={handlePurchase}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: 0,
            textTransform: "uppercase",
            color: "black",
            borderColor: "black",
            ":hover": {
              bgcolor: "black",
              color: "white",
              borderColor: "black",
            },
          }}
        >
          Purchase
        </Button>
      </CardActions>
    </Card>
  );
}
