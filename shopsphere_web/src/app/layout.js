import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import StoreProvider from "@/app/store/StoreProvider";

import AppNavbar from "@/components/app-navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <StoreProvider>
            <AppNavbar />
            <main>
              {children}
            </main>
        </StoreProvider>
      </body>
    </html>
  );
}
