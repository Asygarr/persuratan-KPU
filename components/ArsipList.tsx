"use client";

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
  Snackbar,
  Alert,
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
  tanggalDibuat: string;
  createdAt: string;
}

export default function ArsipList({
  searchQuery,
  tahun,
  bulan,
  tanggal,
  tipe,
}: ArsipListProps) {
  // Menu for each file
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedArsip, setSelectedArsip] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Data for sharing file
  const [email, setEmail] = useState("");
  const [dataSurat, setDataSurat] = useState<Arsip[]>([]);

  // Snackbar
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/allFIles");

      const data: Arsip[] = await response.json();

      console.log(data);

      setDataSurat(data);
    };

    fetchData();
  }, []);

  const handleShareFile = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/share/${selectedArsip}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        setAlertMessage(`File shared to: ${email}`);
        setAlertSeverity("success");
        handleDialogClose();
      } else {
        setAlertMessage("Error sharing file");
        setAlertSeverity("error");
      }
    } catch (error) {
      setAlertMessage("Error sharing file");
      setAlertSeverity("error");
    } finally {
      setOpenAlert(true);
    }
  };

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

  const handleDelete = async (fileId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/delete/${fileId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setAlertMessage(`Arsip dengan id: ${fileId} berhasil dihapus`);
        setAlertSeverity("success");

        setDataSurat((prevData) =>
          prevData.filter((arsip) => arsip.fileId !== fileId)
        );
      } else {
        setAlertMessage("Error deleting file");
        setAlertSeverity("error");
      }
    } catch (error) {
      setAlertMessage("Error deleting file");
      setAlertSeverity("error");
    } finally {
      setOpenAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const filteredArsip = dataSurat
    .filter((arsip) => {
      const matchesSearch =
        searchQuery === "" ||
        arsip.fileName.includes(searchQuery) ||
        arsip.nomorSurat.includes(searchQuery);
      const matchesYear = tahun === "" || arsip.tanggalDibuat.startsWith(tahun);
      const matchesMonth =
        bulan === "" || arsip.tanggalDibuat.includes(`-${bulan}-`);
      const matchesDate =
        tanggal === "" || arsip.tanggalDibuat.endsWith(`-${tanggal}`);
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
    <>
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
                <TableCell
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    window.open(
                      `http://localhost:8000/${arsip.fileId}/preview`,
                      "_blank"
                    )
                  }
                >
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
                  {new Date(arsip.tanggalDibuat).toISOString().split("T")[0]}
                </TableCell>
                <TableCell style={{ width: "80px", textAlign: "center" }}>
                  <IconButton onClick={(e) => handleMenuClick(e, arsip.fileId)}>
                    <IconDotsVertical />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedArsip === arsip.fileId}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleSharedFileClick}>
                      Shared file
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(arsip.fileId)}>
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
              onClick={handleShareFile}
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

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
