import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | 당근마켓",
    default: "당근마켓",
  },
  description: "모든것을 사고 팔아라!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body
        className={`${inter.className} bg-neutral-900 max-w-screen-md text-white mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
