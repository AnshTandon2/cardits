import React, { useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import Navbar from "./AuditsNavBar";

function Audit() {
  const [audits, setAudits] = useState([
    { id: 1, name: "Audit 1", file: "audit1.pdf" },
    { id: 2, name: "Audit 2", file: "audit2.pdf" },
    { id: 3, name: "Audit 3", file: "audit3.pdf" },
  ]);

  const handleAction = (id) => {
    // removes audits properly
    setAudits(audits.filter((audit) => audit.id !== id));
  };

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "1%" }}>
        <div id="title">
          <div>
            <span>Good to see you again!</span> <br />
            You {audits.length} audits pending review 🌿
          </div>
        </div>
      </div>

      <div id="section2" style={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Audits to review
        </Typography>

        <Grid container spacing={2}>
          {audits.map((audit) => (
            <Grid item xs={12} md={6} lg={4} key={audit.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <a
                      href={audit.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "#3f51b5" }}
                    >
                      {audit.name}
                    </a>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAction(audit.id)}
                    style={{ marginRight: "10px" }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleAction(audit.id)}
                  >
                    Reject
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default Audit;
