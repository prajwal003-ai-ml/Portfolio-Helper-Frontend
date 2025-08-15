import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import WholeWrapper from "./components/WholeWrapper";
import Dialog from "./components/Dialog";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Helper Kit",
  description: "This app is specially designed to help the newbie who want to create the portfolio but doesn't want backend , so add your details here and create the app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-[100dvw] overflow-hidden bg-black text-gray-100">
          <WholeWrapper> {children} </WholeWrapper>
          <ToastContainer position="top-center" />
          <Dialog />
        </div>
      </body>
    </html>
  );
}
