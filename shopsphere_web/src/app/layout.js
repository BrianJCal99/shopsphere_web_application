'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import store from "@/app/store/store";
import { Provider } from "react-redux";

import NavBar from "@/components/NavBar";

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
        <Provider store={store}>
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
