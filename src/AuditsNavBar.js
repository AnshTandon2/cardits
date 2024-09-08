import "./NavBar.css";
import React, { useState, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  ); // local storage
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        localStorage.setItem("walletAddress", address); // stores wallet address
      } catch (error) {
        console.error("Connection error:", error);
      }
    } else {
      alert(
        "MetaMask or another Web3 provider is required to connect the wallet."
      );
    }
  };

  useEffect(() => {
    if (!walletAddress) {
      navigate("/login"); // will go back to log in page
    }
  }, [walletAddress, navigate]);

  const disconnectWallet = () => {
    setWalletAddress(null); //
    localStorage.removeItem("walletAddress"); // removing from storage
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Cardits</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/audits">Dashboard</Link>
        </li>
        <li>
          <Link to="/marketplace">Marketplace</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li style={{ display: "flex", alignItems: "center" }}>
          {" "}
          {/* properly alignment */}
          {walletAddress ? (
            <span
              style={{
                color: "#ff0000",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
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
                alignItems: "center",
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
