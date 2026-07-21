import "./globals.css";

export const metadata = {
  title: "WS Royal Bags",
  description: "WS Royal Bags Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}