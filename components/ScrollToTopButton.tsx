"use client";

import React, { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ScrollToTopButton = () => {
  const [showScroll, setShowScroll] = useState(false);

  const handleScroll = () => {
    setShowScroll(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    showScroll && (
      <Fab
        color="primary"
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "#E57611",
          "&:hover": { backgroundColor: "#d0640d" },
        }}
      >
        <ArrowUpwardIcon />
      </Fab>
    )
  );
};

export default ScrollToTopButton;
