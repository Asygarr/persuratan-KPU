"use client";

import { useState, ChangeEvent, DragEvent } from "react";
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { IconFileText, IconFile } from "@tabler/icons-react"; // Import icons
import { Icon } from "@iconify/react";

export default function InputArsipPage() {
  const [noSurat, setNoSurat] = useState<string>("");
  const [tipeSurat, setTipeSurat] = useState<string>("");
  const [namaFile, setNamaFile] = useState<string>(""); // Nama file opsional
  const [fileSurat, setFileSurat] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ noSurat, tipeSurat, namaFile, fileSurat });
    // Simpan ke fake database (state atau array)
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileSurat(file);
  };

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    setFileSurat(file);
    setDragOver(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const renderFileIcon = () => {
    if (fileSurat?.name.endsWith(".pdf")) {
      return (
        <Icon
          icon="bx:bxs-file-pdf"
          style={{ fontSize: "25px", color: "#FF0000" }}
        />
      );
    } else if (fileSurat?.name.endsWith(".docx")) {
      return (
        <Icon
          icon="bx:bxs-file-doc"
          style={{ fontSize: "30px", color: "#0078D4" }}
        />
      );
    }
    return null;
  };

  return (
    <Container
      sx={{
        mt: 11,
        p: 2,
        maxWidth: "600px",
        height: "550px", // Adjust height to fit new input
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" sx={{ mb: 4, textAlign: "center" }}>
        Input File
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nama File (Opsional)"
          fullWidth
          sx={{ mb: 2 }}
          value={namaFile}
          onChange={(e) => setNamaFile(e.target.value)}
        />

        <TextField
          label="No Surat"
          fullWidth
          sx={{ mb: 2 }}
          value={noSurat}
          onChange={(e) => setNoSurat(e.target.value)}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tipe Surat</InputLabel>
          <Select
            value={tipeSurat}
            onChange={(e) => setTipeSurat(e.target.value as string)}
          >
            <MenuItem value="Surat Masuk">Surat Masuk</MenuItem>
            <MenuItem value="Surat Keluar">Surat Keluar</MenuItem>
          </Select>
        </FormControl>

        {/* Input File */}
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-input"
        />
        <Box
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("file-input")?.click()}
          sx={{
            border: `2px dashed ${dragOver ? "#E57611" : "#ccc"}`,
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            backgroundColor: dragOver ? "#fdf4e3" : "#fafafa",
            mb: 2,
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {fileSurat ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              {renderFileIcon()}
              <Typography variant="body2" sx={{ ml: 1 }}>
                {fileSurat.name}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ color: "#aaa" }}>
              Drag & drop file here, or click to select
            </Typography>
          )}
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#E57611",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          Simpan Arsip
        </Button>
      </form>
    </Container>
  );
}
