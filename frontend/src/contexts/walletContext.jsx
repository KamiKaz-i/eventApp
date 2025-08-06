/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useState } from "react";
export const walletContext = createContext({});

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  return (
    <walletContext.Provider value={{ wallet, setWallet }}>
      {children}
    </walletContext.Provider>
  );
};
