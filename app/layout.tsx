import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
} from "@mui/material";
import Link from "next/link";

import "./globals.css";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export const metadata = {
  title: "Aplikasi Persuratan",
  description: "Sistem persuratan berbasis website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <CssBaseline />
        <AppBar position="fixed" sx={{ backgroundColor: "#E57611" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link
                href={"/home"}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                KPU Kota Makassar
              </Link>
            </Typography>
            <Button color="inherit" component={Link} href="/arsip">
              Arsip
            </Button>
            <Button color="inherit" component={Link} href="/input-arsip">
              Input Arsip
            </Button>
          </Toolbar>
        </AppBar>
        <main style={{ marginTop: "64px" }}>{children}</main>

        <ScrollToTopButton />
      </body>
    </html>
  );
}
