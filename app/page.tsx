"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Box,
  InputAdornment,
  IconButton,
  Menu,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Import icon
import ArsipList from "@/components/ArsipList";

export default function Arsip() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tipeSurat, setTipeSurat] = useState<string>("semua");
  const [tahun, setTahun] = useState<string>("");
  const [bulan, setBulan] = useState<string>("");
  const [tanggal, setTanggal] = useState<string>("");

  // State untuk filter dropdown
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const isFilterMenuOpen = Boolean(filterAnchorEl);

  const handleSearch = () => {
    // Lakukan pencarian berdasarkan query
    console.log({ searchQuery, tipeSurat, tahun, bulan, tanggal });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTipeSurat(newValue);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {/* Tab Menu: Semua, Surat Masuk, Surat Keluar */}
        <Tabs value={tipeSurat} onChange={handleTabChange}>
          <Tab label="Semua" value="semua" />
          <Tab label="Surat Masuk" value="Surat Masuk" />
          <Tab label="Surat Keluar" value="Surat Keluar" />
        </Tabs>

        {/* Search Bar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              // disableUnderline: true,
            }}
            sx={{
              width: "300px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              borderRadius: "20px",
              backgroundColor: "#F0F0F0",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
              "& .MuiInputBase-input": {
                padding: "10px 14px",
              },
            }}
          />

          {/* Filter Button */}
          <Button
            variant="outlined"
            onClick={handleFilterClick}
            sx={{
              height: "40px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              textTransform: "none",
            }}
            endIcon={<ArrowDropDownIcon />}
          >
            Filter
          </Button>

          {/* Filter Menu */}
          <Menu
            anchorEl={filterAnchorEl}
            open={isFilterMenuOpen}
            onClose={handleFilterClose}
            PaperProps={{
              style: {
                maxHeight: 300,
                width: "250px",
              },
            }}
          >
            {/* Dropdown untuk Tahun, Bulan, Tanggal */}
            <Box sx={{ p: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Tahun</InputLabel>
                <Select
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value as string)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                  <MenuItem value="2021">2021</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Bulan</InputLabel>
                <Select
                  value={bulan}
                  onChange={(e) => setBulan(e.target.value as string)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  <MenuItem value="01">Januari</MenuItem>
                  <MenuItem value="02">Februari</MenuItem>
                  <MenuItem value="03">Maret</MenuItem>
                  <MenuItem value="04">April</MenuItem>
                  <MenuItem value="05">Mei</MenuItem>
                  <MenuItem value="06">Juni</MenuItem>
                  <MenuItem value="07">Juli</MenuItem>
                  <MenuItem value="08">Agustus</MenuItem>
                  <MenuItem value="09">September</MenuItem>
                  <MenuItem value="10">Oktober</MenuItem>
                  <MenuItem value="11">November</MenuItem>
                  <MenuItem value="12">Desember</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Tanggal</InputLabel>
                <Select
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value as string)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  {[...Array(31)].map((_, i) => (
                    <MenuItem
                      key={i + 1}
                      value={String(i + 1).padStart(2, "0")}
                    >
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Menu>
        </Box>
      </Box>

      {/* Arsip List */}
      <ArsipList
        searchQuery={searchQuery}
        tipe={tipeSurat}
        tahun={tahun}
        bulan={bulan}
        tanggal={tanggal}
      />
    </Container>
  );
}
