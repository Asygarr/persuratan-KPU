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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArsipList from "@/components/ArsipList";

export default function ArsipListPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tipeSurat, setTipeSurat] = useState<string>("semua");
  const [tahun, setTahun] = useState<string>("");
  const [bulan, setBulan] = useState<string>("");
  const [tanggal, setTanggal] = useState<string>("");

  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const isFilterMenuOpen = Boolean(filterAnchorEl);

  const handleSearch = () => {
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
    <Container sx={{ mt: 11, width: { xs: "100%", md: "80%" } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Tabs
          value={tipeSurat}
          onChange={handleTabChange}
          variant="scrollable"
          sx={{ width: { xs: "100%", md: "auto" }, mb: { xs: 1, md: 0 } }}
        >
          <Tab label="Semua" value="semua" />
          <Tab label="Surat Masuk" value="Surat Masuk" />
          <Tab label="Surat Keluar" value="Surat Keluar" />
        </Tabs>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mt: { xs: 2, md: 0 },
            flexDirection: { xs: "row", md: "row" },
            width: { xs: "100%", md: "auto" },
          }}
        >
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
            }}
            sx={{
              flexGrow: { xs: 1, md: 0 },
              width: { xs: "100%", md: "300px" },
              height: "40px",
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

          <Button
            variant="outlined"
            onClick={handleFilterClick}
            sx={{
              width: { xs: "auto", md: "auto" },
              height: "40px",
              borderRadius: "20px",
              textTransform: "none",
            }}
            endIcon={<ArrowDropDownIcon />}
          >
            Filter
          </Button>

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
