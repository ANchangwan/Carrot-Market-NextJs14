import type { Metadata } from "next";
import { Roboto, Rubik_Scribble } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });
const robot = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});
const rubik = Rubik_Scribble({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

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
        className={`${robot.className} bg-neutral-900 max-w-screen-sm text-white mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
