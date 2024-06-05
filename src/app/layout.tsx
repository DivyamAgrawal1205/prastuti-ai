import type { Metadata } from "next";
import "./globals.css";
import localFont from "@next/font/local";

const satoshiFont = localFont({
  src: [
    {
      path: '../../public/fonts/satoshi-variable.ttf',
      style: 'normal'
    }
  ],
  variable: '--font-satoshi'
})

export const metadata: Metadata = {
  title: "Prastuti AI",
  description: "We have an AI that can create PPTs for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshiFont.variable} font-satoshi h-full `}>{children}</body>
    </html>
  );
}
