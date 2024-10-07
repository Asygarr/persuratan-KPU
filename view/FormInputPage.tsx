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
import { Icon } from "@iconify/react";

interface ArsipData {
  nomorSurat: string;
  jenisSurat: string;
  fileName: string;
  file: File | null;
}

export default function InputArsipPage() {
  const [nomorSurat, setNomorSurat] = useState<string>("");
  const [jenisSurat, setJenisSurat] = useState<string>("");
  const [fileName, setFileName] = useState<string>(""); // Optional file name
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [dataUpload, setDataUpload] = useState<ArsipData[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!nomorSurat || !jenisSurat || !file) {
      console.log("Please fill in all fields and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("nomorSurat", nomorSurat);
    formData.append("jenisSurat", jenisSurat);
    formData.append("namaFile", fileName);
    formData.append("file", file as File);

    try {
      const response = await fetch("http://localhost:8000", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setDataUpload(data);
      // Reset form state after successful upload
      setNomorSurat("");
      setJenisSurat("");
      setFileName("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0] || null;
    setFile(droppedFile);
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
    if (file) {
      if (file.name.endsWith(".pdf")) {
        return (
          <Icon
            icon="bx:bxs-file-pdf"
            style={{ fontSize: "25px", color: "#FF0000" }}
          />
        );
      } else if (file.name.endsWith(".docx")) {
        return (
          <Icon
            icon="bx:bxs-file-doc"
            style={{ fontSize: "30px", color: "#0078D4" }}
          />
        );
      }
    }
    return null;
  };

  return (
    <Container
      sx={{
        mt: 11,
        p: 2,
        maxWidth: "600px",
        height: "550px",
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
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />

        <TextField
          label="No Surat"
          fullWidth
          sx={{ mb: 2 }}
          value={nomorSurat}
          onChange={(e) => setNomorSurat(e.target.value)}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tipe Surat</InputLabel>
          <Select
            value={jenisSurat}
            onChange={(e) => setJenisSurat(e.target.value as string)}
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
          {file ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              {renderFileIcon()}
              <Typography variant="body2" sx={{ ml: 1 }}>
                {file.name}
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
