import "./NavBar.css";
import React, { useState, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  ); // Retrieve from localStorage
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        localStorage.setItem("walletAddress", address); // Store wallet address
      } catch (error) {
        console.error("Connection error:", error);
      }
    } else {
      alert(
        "MetaMask or another Web3 provider is required to connect the wallet."
      );
    }
  };

  // Detect wallet disconnection
  useEffect(() => {
    if (!walletAddress) {
      navigate("/login"); // Redirect to login if wallet is disconnected
    }
  }, [walletAddress, navigate]);

  const disconnectWallet = () => {
    setWalletAddress(null); // Clear wallet address state
    localStorage.removeItem("walletAddress"); // Remove wallet address from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Cardits</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/marketplace">Marketplace</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li style={{ display: "flex", alignItems: "center" }}>
          {" "}
          {/* Ensure vertical alignment */}
          {walletAddress ? (
            <span
              style={{
                color: "#ff0000",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center", // Ensure vertical alignment for the span
              }}
              onClick={disconnectWallet}
            >
              Disconnect
            </span>
          ) : (
            <a
              onClick={connectWallet}
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center", // Ensure vertical alignment for the connect wallet link
              }}
            >
              Connect Wallet
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
