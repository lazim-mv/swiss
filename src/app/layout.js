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
  title: {
    default: "Swiss Village Zakho - Luxury Villas in Dubai",
    template: "%s | Swiss Village Zakho"
  },
  description: "Experience luxury living at Swiss Village Zakho. Premium residential villas with modern architecture, world class amenities, and exceptional design in Bedar, Zakho. Just 8 minutes from city center.",
  keywords: [
    "Swiss Village Zakho",
    "luxury villas Zakho",
    "premium real estate Dubai",
    "villas for sale Zakho",
    "residential community Zakho",
    "luxury homes Dubai",
    "Bedar villas",
    "Swiss architecture Zakho",
    "modern villas Dubai",
    "family villas Dubai"
  ],
  authors: [{ name: "Swiss Village Zakho" }],
  creator: "Swiss Village Zakho",
  publisher: "Swiss Village Zakho",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.swissvillage-zakho.com/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Swiss Village Zakho - Luxury Villas in Dubai",
    description: "Experience luxury living at Swiss Village Zakho. Premium residential villas with modern architecture and world-class amenities in Bedar, Zakho.",
    url: 'https://www.swissvillage-zakho.com/og-image.jpeg',
    siteName: 'Swiss Village Zakho',
    images: [
      {
        url: '/og-image.jpeg',
        width: 1200,
        height: 630,
        alt: 'Swiss Village Zakho - Luxury Villas',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swiss Village Zakho - Luxury Villas in Dubai',
    description: 'Experience luxury living at Swiss Village Zakho. Premium residential villas with modern architecture and world-class amenities.',
    images: ['/og-image.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon_32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon32.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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
