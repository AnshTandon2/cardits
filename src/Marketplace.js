import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import Slider from "react-slick"; // Import the react-slick slider

const sellers = [
  {
    id: 1,
    name: "Eco Green Solutions",
    credits: 1000,
    price: 50,
    image: "/images/seller1.png",
  },
  {
    id: 2,
    name: "Carbon Offset Co.",
    credits: 500,
    price: 45,
    image: "/images/seller2.png",
  },
  {
    id: 3,
    name: "Sustainable Energy",
    credits: 1500,
    price: 55,
    image: "/images/seller3.png",
  },
  {
    id: 4,
    name: "Green Future",
    credits: 700,
    price: 52,
    image: "/images/seller4.png",
  },
];

const Marketplace = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);

  const handlePurchase = (seller) => {
    setSelectedSeller(seller);
    alert(
      `You have purchased credits from ${seller.name} at $${seller.price} per credit!`
    );
  };

  // Settings for the react-slick slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, textAlign: "center" }}>
        Today's Deals
      </Typography>

      {/* Slider Component */}
      <Slider {...sliderSettings}>
        {sellers.map((seller) => (
          <Box
            key={seller.id}
            sx={{ padding: "16px", marginRight: "10px", height: "100%" }}
          >
            <Card
              sx={{
                height: "350px", // Increase vertical length of card
                display: "flex",
                flexDirection: "column", // Align content vertically
                justifyContent: "space-between",
                margin: "2%",
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={seller.image}
                  alt={seller.name}
                  sx={{ width: 80, height: 80, marginBottom: 2 }} // Increased avatar size and margin
                />
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h6">{seller.name}</Typography>
                  <Typography variant="body2">
                    {seller.credits} credits available
                  </Typography>
                  <Typography variant="body2">
                    Price: ${seller.price} per credit
                  </Typography>
                </Box>
              </CardContent>
              <Box sx={{ paddingBottom: 2, textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePurchase(seller)}
                >
                  Purchase Credits
                </Button>
              </Box>
            </Card>
          </Box>
        ))}
      </Slider>

      {selectedSeller && (
        <Box sx={{ marginTop: 4, textAlign: "center" }}>
          <Typography variant="h6">
            You selected: {selectedSeller.name}
          </Typography>
          <Typography variant="body2">
            Credits: {selectedSeller.credits} | Price: ${selectedSeller.price}{" "}
            per credit
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Marketplace;
