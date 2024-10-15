"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [nomorSurat, setNomorSurat] = useState("");
  const [jenisSurat, setJenisSurat] = useState("Surat Masuk");
  const [tanggalDibuat, setTanggalDibuat] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setIsUploaded(false);
      setUploadSuccess(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    if (fileName) formData.append("fileName", fileName);
    if (nomorSurat) formData.append("nomorSurat", nomorSurat);
    if (jenisSurat) formData.append("jenisSurat", jenisSurat);
    if (tanggalDibuat) formData.append("tanggalDibuat", tanggalDibuat);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("File uploaded successfully:", data);
      setIsUploaded(true);
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadSuccess(false);
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", margin: "20px", marginTop: "6rem" }}
    >
      <Typography variant="h6" gutterBottom>
        Upload Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              required
              style={{ display: "none" }}
            />
            <label htmlFor="file">
              <Button variant="contained" component="span" color="primary">
                Upload File
              </Button>
            </label>
            {file && (
              <Typography
                variant="body1"
                style={{ display: "inline-block", marginLeft: "10px" }}
              >
                {file.name}
              </Typography>
            )}
            {isUploaded && file && file.name.endsWith(".pdf")}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="File Name"
              variant="outlined"
              fullWidth
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nomor Surat"
              variant="outlined"
              fullWidth
              value={nomorSurat}
              onChange={(e) => setNomorSurat(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="jenis-surat-label">Jenis Surat</InputLabel>
              <Select
                labelId="jenis-surat-label"
                label="Jenis Surat"
                value={jenisSurat}
                onChange={(e) => setJenisSurat(e.target.value as string)}
              >
                <MenuItem value="Surat Masuk">Surat Masuk</MenuItem>
                <MenuItem value="Surat Keluar">Surat Keluar</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tanggal Dibuat"
              type="date"
              variant="outlined"
              fullWidth
              value={tanggalDibuat}
              onChange={(e) => setTanggalDibuat(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Upload
            </Button>
          </Grid>
          {uploadSuccess && (
            <Grid item xs={12}>
              <Alert severity="success">File berhasil diunggah!</Alert>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};

export default UploadForm;
