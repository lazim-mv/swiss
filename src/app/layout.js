import { Libre_Baskerville, Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollSmootherProvider from "./utils/gsapScrollSmootherProvider";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Swiss Villa - Luxury Real Estate",
  description: "Exclusive luxury villa real estate - Coming Soon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${libreBaskerville.variable} ${playfair.variable} antialiased`}>
        <ScrollSmootherProvider>
          {children}
        </ScrollSmootherProvider>
      </body>
    </html>
  );
}
