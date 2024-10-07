'use client';

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
} from '@mui/material';

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [nomorSurat, setNomorSurat] = useState('');
  const [jenisSurat, setJenisSurat] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    if (fileName) formData.append('fileName', fileName);
    if (nomorSurat) formData.append('nomorSurat', nomorSurat);
    if (jenisSurat) formData.append('jenisSurat', jenisSurat);

    try {
      const response = await fetch('http://192.168.50.40:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      console.log('File uploaded successfully:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
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
              style={{ display: 'none' }}
            />
            <label htmlFor="file">
              <Button
                variant="contained"
                component="span"
                color="primary"
              >
                Upload File
              </Button>
            </label>
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
            <TextField
              label="Jenis Surat"
              variant="outlined"
              fullWidth
              value={jenisSurat}
              onChange={(e) => setJenisSurat(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Upload
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UploadForm;
