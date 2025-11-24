import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const metadata = {
  title: "Swiss Villa - Luxury Real Estate",
  description: "Exclusive luxury villa real estate - Coming Soon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
