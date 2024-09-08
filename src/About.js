import React from "react";
import { Box, Typography, Grid, Avatar, Container, Paper } from "@mui/material";

const teamMembers = [
  {
    name: "Ansh Kothari",
    role: "CEO & Founder",
    image: "/images/alice.jpg",
  },
  {
    name: "Ansh Tandon",
    role: "Chief Technology Officer",
    image: "/images/john.jpg",
  },
  {
    name: "Aditya Kattil",
    role: "Lead Developer",
    image: "/images/emma.jpg",
  },
  {
    name: "Partth Kulkarni",
    role: "Lead Developer",
    image: "/images/emma.jpg",
  },
];

const AboutUs = () => {
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Typography variant="h3" align="center" gutterBottom>
          About Us
        </Typography>

        <Typography variant="body1" align="center" sx={{ marginBottom: 4 }}>
          We are a passionate team dedicated to revolutionizing the way we
          interact with the environment. Our mission is to provide innovative
          solutions for carbon credits, making it easier for businesses and
          individuals to contribute to sustainability. Meet the talented
          professionals behind our success.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{ width: 100, height: 100, marginBottom: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.role}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default AboutUs;
