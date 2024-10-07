'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { IconDotsVertical } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

interface ArsipListProps {
  searchQuery: string;
  tahun: string;
  bulan: string;
  tanggal: string;
  tipe: string;
}

interface Arsip {
  id: string;
  fileId: string;
  fileName: string;
  nomorSurat: string;
  jenisSurat: string;
  createdAt: string;
}

export default function ArsipList({
  searchQuery,
  tahun,
  bulan,
  tanggal,
  tipe,
}: ArsipListProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedArsip, setSelectedArsip] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [dataSurat, setDataSurat] = useState<Arsip[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://192.168.50.40:8000/allFIles");
      const data: Arsip[] = await response.json();
      setDataSurat(data);
    };

    fetchData();
  }, []);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedArsip(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSharedFileClick = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = (id: string) => {
    console.log(`Hapus arsip dengan id: ${id}`);
  };

  const filteredArsip = dataSurat
    .filter((arsip) => {
      const matchesSearch =
        searchQuery === "" ||
        arsip.fileName.includes(searchQuery) ||
        arsip.nomorSurat.includes(searchQuery);
      const matchesYear = tahun === "" || arsip.createdAt.startsWith(tahun);
      const matchesMonth = bulan === "" || arsip.createdAt.includes(`-${bulan}-`);
      const matchesDate = tanggal === "" || arsip.createdAt.endsWith(`-${tanggal}`);
      const matchesTipe = tipe === "semua" || arsip.jenisSurat === tipe;
      return (
        matchesSearch &&
        matchesYear &&
        matchesMonth &&
        matchesDate &&
        matchesTipe
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#efefef" }}>
            <TableCell>Nama File</TableCell>
            <TableCell>No Surat</TableCell>
            <TableCell>Tipe Surat</TableCell>
            <TableCell style={{ width: "9rem", textAlign: "center" }}>
              Tanggal
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredArsip.map((arsip) => (
            <TableRow key={arsip.id}>
              <TableCell style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "auto",
                    marginRight: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                    }}
                  >
                    <Icon
                      icon="bx:bxs-file-pdf"
                      style={{ fontSize: "25px", color: "#FF0000" }}
                    />
                  </div>
                </div>
                {arsip.fileName}
              </TableCell>
              <TableCell>{arsip.nomorSurat}</TableCell>
              <TableCell>
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: "12px",
                    backgroundColor:
                      arsip.jenisSurat === "Surat Masuk"
                        ? "#DFF2E0"
                        : "#FDE0E0",
                    color:
                      arsip.jenisSurat === "Surat Masuk"
                        ? "#4CAF50"
                        : "#F44336",
                    fontWeight: "bold",
                  }}
                >
                  {arsip.jenisSurat === "Surat Masuk" ? "Masuk" : "Keluar"}
                </span>
              </TableCell>
              <TableCell style={{ width: "9rem", textAlign: "center" }}>
                {arsip.createdAt}
              </TableCell>
              <TableCell style={{ width: "80px", textAlign: "center" }}>
                <IconButton onClick={(e) => handleMenuClick(e, arsip.id)}>
                  <IconDotsVertical />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedArsip === arsip.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleSharedFileClick}>
                    Shared file
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(arsip.id)}>
                    Delete
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "12px",
            padding: "20px",
          },
        }}
      >
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}
        >
          Share File via Email
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{ marginBottom: "20px", textAlign: "center" }}
          >
            Masukkan email untuk berbagi file.
          </Typography>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              marginBottom: "20px",
              "& .MuiInputBase-root": {
                borderRadius: "8px",
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            sx={{
              backgroundColor: "#ff2e2e",
              borderRadius: "8px",
              color: "white",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log(`File shared to: ${email}`);
              handleDialogClose();
            }}
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50",
              borderRadius: "8px",
              color: "white",
            }}
          >
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
