import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavBar from "@/app/components/NavBar";
import StoreProvider from "@/app/store/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <StoreProvider>
          <NavBar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
