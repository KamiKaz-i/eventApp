/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import { userContext } from "./userContext";
export const orderContext = createContext({});

export const OrderProvider = ({ children }) => {
  const { user } = useContext(userContext);
  const [orderTickets, setOrderTickets] = useState([]);
  const [order, setOrder] = useState(null);
  const fetchOrders = async () => {
    if (!user) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/order-tickets/order/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await response.json();

      if (res.message === "Order not found") {
        setOrderTickets([]);
      }
      if (response.ok) {
        setOrderTickets(res.orderTickets);
        setOrder(res.order);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);
  return (
    <orderContext.Provider
      value={[orderTickets, setOrderTickets, fetchOrders, order, setOrder]}
    >
      {children}
    </orderContext.Provider>
  );
};
