import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import ToastProvider from "@/components/ToastProvider";
import Head from "next/head";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"
          type="text/javascript"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  w-full h-screen  bg-blue-200 ` }
      >
        <ToastProvider>
          <>
            <Navbar/>
            <div className="h-[90%] relative  scrollbar-hide first-letter:relative">
              <div id="portal" />
                {children}
            </div>
          </>
        </ToastProvider>
      </body>
    </html>
  );
}
