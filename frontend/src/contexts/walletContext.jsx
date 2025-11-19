/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useState, useEffect } from "react";
import { url } from "../url";
export const walletContext = createContext({});

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
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
    <walletContext.Provider value={{ wallet, setWallet }}>
      {children}
    </walletContext.Provider>
  );
};
