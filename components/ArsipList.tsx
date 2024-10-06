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
import { IconFile, IconDotsVertical } from "@tabler/icons-react"; // Menggunakan Tabler Icons
import { arsipData } from "../utils/fakeData";
import { useState } from "react";
import { Icon } from "@iconify/react";

interface ArsipListProps {
  searchQuery: string;
  tahun: string;
  bulan: string;
  tanggal: string;
  tipe: string;
}

export default function ArsipList({
  searchQuery,
  tahun,
  bulan,
  tanggal,
  tipe,
}: ArsipListProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedArsip, setSelectedArsip] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState("");

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    id: number
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

  const handleDelete = (id: number) => {
    // Placeholder untuk delete, nanti bisa ditambahkan logic penghapusan
    console.log(`Hapus arsip dengan id: ${id}`);
  };

  const filteredArsip = arsipData
    .filter((arsip) => {
      const matchesSearch =
        searchQuery === "" ||
        arsip.fileName.includes(searchQuery) ||
        arsip.nomorSurat.includes(searchQuery);
      const matchesYear = tahun === "" || arsip.uploadDate.startsWith(tahun);
      const matchesMonth =
        bulan === "" || arsip.uploadDate.includes(`-${bulan}-`);
      const matchesDate =
        tanggal === "" || arsip.uploadDate.endsWith(`-${tanggal}`);
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
      const dateA = new Date(a.uploadDate);
      const dateB = new Date(b.uploadDate);
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
                    {/* <Icon
                      icon="bx:bxs-file-doc"
                      style={{ fontSize: "30px", color: "#0078D4" }}
                    /> */}
                    {/* pdf */}
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
                {arsip.uploadDate}
              </TableCell>
              <TableCell style={{ width: "80px", textAlign: "center" }}>
                {/* <IconButton
                  onClick={() => handleDelete(arsip.id)}
                  sx={{ color: "#F44336" }}
                >
                  <IconTrash />
                </IconButton> */}
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
                  <MenuItem onClick={(e) => handleDelete(arsip.id)}>
                    Delete
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pop-up dialog untuk shared file */}
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
