import ResponsiveNavbar from "@/components/ResponsiveNavbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <ResponsiveNavbar />
        <main style={{ marginTop: "64px" }}>{children}</main>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
