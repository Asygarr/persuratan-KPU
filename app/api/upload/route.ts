// pages/api/upload.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const formData = new FormData();

    // Append the file to FormData
    if (req.body.file) {
      formData.append('file', req.body.file);
    }

    // Append other fields
    if (req.body.fileName) {
      formData.append('fileName', req.body.fileName);
    }
    if (req.body.nomorSurat) {
      formData.append('nomorSurat', req.body.nomorSurat);
    }
    if (req.body.jenisSurat) {
      formData.append('jenisSurat', req.body.jenisSurat);
    }

    try {
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json(data);
      }

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: 'Upload failed', error });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
