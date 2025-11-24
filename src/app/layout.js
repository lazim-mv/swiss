import { Libre_Baskerville } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre",
});

export const metadata = {
  title: "Swiss Villa - Luxury Real Estate",
  description: "Exclusive luxury villa real estate - Coming Soon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${libreBaskerville.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
