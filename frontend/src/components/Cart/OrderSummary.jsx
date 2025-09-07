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
import { url } from "../../url.jsx";

export default function OrderSummary() {
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
    <Card elevation={3} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Order Summary
        </Typography>

        <List dense>
          <Divider component="li" sx={{ my: 1 }} />
          <ListItem sx={{ py: 1 }}>
            <ListItemText primary="Total" sx={{ fontWeight: "bold" }} />
            <Typography fontWeight="bold">${order.total_price}</Typography>
          </ListItem>
        </List>
      </CardContent>

      <CardActions sx={{ p: 2, flexDirection: "column" }}>
        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handlePurchase}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            fontSize: "1rem",
            bgcolor: "#3f3f3f",
            ":hover": {
              bgcolor: "#5f5f5f",
            },
          }}
        >
          Purchase
        </Button>
      </CardActions>
    </Card>
  );
}
