import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import NavBar from "./NavBar";
import CircularProgress from "./progress";
import { LineChart } from "@mui/x-charts/LineChart";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Routes, Route, useLocation } from "react-router-dom";
//importing rest of componenets
import Marketplace from "./Marketplace";
import About from "./About";
import Login from "./Login";
import Audits from "./Audits";

// main dashboard for carbon credits
const Dashboard = () => {
  const credits = 75;
  const price = 50;
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    if (file) {
      alert(`File uploaded successfully: ${file.name}`);
      setOpen(false);
      navigate("/"); // Redirect to homepage or root
    } else {
      alert("Please upload a file before proceeding.");
    }
  };

  return (
    <div>
      <div id="audit">
        <Button
          variant="outlined"
          sx={{ color: "#333333", marginRight: "2%" }}
          onClick={handleOpen}
        >
          File An Audit
        </Button>
      </div>
      <div style={{ marginTop: "1%" }}>
        <div id="title">
          <div>
            <span>Welcome Back!</span> <br />
            Let's save the environment! 🌿
          </div>
        </div>
      </div>
      <div id="section2">
        <h2 id="heading2">Your Statistics</h2>
        <div id="stats">
          <div id="progressBar">
            <CircularProgress progress={credits} />
            <p>Remaining Credits</p>
          </div>
          <div id="graph">
            <LineChart
              xAxis={[{ data: [2019, 2020, 2021, 2022, 2023, 2024] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  area: true,
                },
              ]}
              width={500}
              height={300}
              colors={["#228B22"]}
            />
          </div>
          <div id="portfolioValue">
            <h1>
              $
              {(credits * price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h1>
            <p>Portfolio Value</p>
          </div>
        </div>
      </div>

      {/* Modal for File Upload */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Upload Your Audit</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <TextField
            type="file"
            inputProps={{ accept: ".pdf,.doc,.docx,.xlsx,.xls" }}
            onChange={handleFileUpload}
            fullWidth
            sx={{ marginTop: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            variant="contained"
            startIcon={<UploadFileIcon />}
            sx={{ marginTop: 2 }}
            fullWidth
            onClick={handleUploadClick}
          >
            Upload File
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

function App() {
  const location = useLocation();
  const showNavBar = location.pathname !== "/login";
  const showNavBar2 = location.pathname !== "/audits";
  return (
    <div>
      {showNavBar && showNavBar2 && <NavBar />} {/* this will render navbar */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/audits" element={<Audits />} />
      </Routes>
    </div>
  );
}

export default App;
