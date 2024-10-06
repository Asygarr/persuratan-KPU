"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

export default function ResponsiveNavbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#E57611" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link
            href="/home"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            KPU Kota Makassar
          </Link>
        </Typography>

        {/* Menu untuk tampilan desktop */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: "1rem" }}>
          <Button color="inherit" component={Link} href="/arsip">
            Arsip
          </Button>
          <Button color="inherit" component={Link} href="/input-arsip">
            Input Arsip
          </Button>
        </Box>

        {/* Menu burger untuk tampilan mobile */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component={Link} href="/arsip">
              Arsip
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              href="/input-arsip"
            >
              Input Arsip
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
