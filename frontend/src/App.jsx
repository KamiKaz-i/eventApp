import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import MyEvents from "./pages/MyEvents.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import ProtectedRoutes from "./components/Auth/ProtectedRoutes.jsx";
import UnprotectedRoutes from "./components/Auth/UnprotectedRoutes.jsx";
import { useState } from "react";
import { userContext } from "./contexts/userContext.jsx";
import Wallet from "./pages/Wallet.jsx";
import { WalletProvider } from "./contexts/walletContext.jsx";
import { OrderProvider } from "./contexts/orderContext.jsx";
import EventDetails from "./pages/EventDetails";
import Cart from "./pages/Cart.jsx";
import Tickets from "./pages/Tickets.jsx";
function App() {
  const [user, setUser] = useState(null);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route element={<UnprotectedRoutes />}>
            <Route path="/" element={<Navigate to="/login" />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>

          <Route
            element={
              <OrderProvider>
                <ProtectedRoutes />
              </OrderProvider>
            }
          >
            <Route path="/events" element={<Events />}></Route>
            <Route path="/create-event" element={<CreateEvent />}></Route>
            <Route path="/my-events" element={<MyEvents />}></Route>
            <Route path="/my-tickets" element={<Tickets />}></Route>
            <Route
              path="/wallet"
              element={
                <WalletProvider>
                  <Wallet />
                </WalletProvider>
              }
            ></Route>
            <Route path="/events/:id" element={<EventDetails />}></Route>
            <Route
              path="/cart"
              element={
                <WalletProvider>
                  <Cart />
                </WalletProvider>
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
