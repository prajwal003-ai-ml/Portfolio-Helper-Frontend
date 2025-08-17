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
  title: "Portfolio Helper, Makes Portfolio Easier",
  description: "This app is specially designed to help the newbie who want to create the portfolio but doesn't want backend , so add your details here and create the app",
  keywords:[
  "portfolio helper",
  "portfolio builder",
  "portfolio api generator",
  "api backend generator",
  "api for portfolio",
  "nextjs backend",
  "nestjs alternative",
  "nextjs api routes",
  "react developer portfolio",
  "developer tools",
  "fullstack portfolio",
  "nodejs backend",
  "postgresql api",
  "neon database",
  "auth backend",
  "jwt authentication",
  "authentication api",
  "login signup api",
  "free api generator",
  "vercel deploy api",
  "render backend",
  "cloud database integration",
  "typescript backend",
  "express alternative",
  "axios fetch api example",
  "api integration demo",
  "web developer tools",
  "frontend backend integration",
  "portfolio projects",
  "personal branding portfolio",
  "open source portfolio helper",
  "api demo with fetch",
  "api demo with axios",
  "framer motion landing page",
  "animated portfolio site",
  "nextjs landing page",
  "developer showcase",
  "developer portfolio website",
  "modern web tools",
  "free portfolio api",
  "project helper tool",
  "developer productivity tools",
  "portfolio site with api",
  "backend for frontend devs"
]

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
