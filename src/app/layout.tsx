import type { Metadata } from "next";
// Removed Next.js font imports as they are not supported in this environment
import "./globals.css";

export const metadata: Metadata = {
  title: "flory_dz.shop - Luxury Intermediary",
  description: "Your modern and elegant price estimator for international shopping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Load Crafty Girls (Playful Display) and Inter (Sans-serif Body) directly from Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Crafty+Girls&display=swap" 
          rel="stylesheet" 
        />
      </head>
      {/* The font classes are now applied via the global CSS on the body */}
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
