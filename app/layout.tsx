import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/Common/globals.css";
import "@/app/layout.css";
import { Viewport } from "next";
import LoginLayout from "./loginLayout";
import DsElLayout from "@/Elements/ERPComponents/DsElLayout/DsElLayout";

const openSans = localFont({
  src: "../Common/fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf",
  variable: "--font-Open-sans",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "ERP",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${openSans.variable}`}
        style={{ width: "100vw", height: "100vh" }}
      >
        <LoginLayout>{children}</LoginLayout>
      </body>
    </html>
  );
}
