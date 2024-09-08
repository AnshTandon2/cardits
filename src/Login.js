import React from "react";
import { Box, Button, Typography, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Web3Provider } from "@ethersproject/providers";

const Login = () => {
  const navigate = useNavigate(); // Use navigate to handle redirection

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        localStorage.setItem("walletAddress", address); // Store wallet address in local storage
        navigate("/"); // Redirect to the dashboard or main page
      } catch (error) {
        console.error("Connection error:", error);
      }
    } else {
      alert(
        "MetaMask or another Web3 provider is required to connect the wallet."
      );
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, textAlign: "center", width: "100%" }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Cardits
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          Connect your wallet to access the platform and start using carbon
          credits.
        </Typography>

        {/* Connect Wallet */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={connectWallet}
          sx={{
            textTransform: "none",
            backgroundColor: "#4CAF50",
            "&:hover": {
              backgroundColor: "#45a049",
            },
            padding: "12px 24px",
          }}
        >
          Connect Wallet
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
