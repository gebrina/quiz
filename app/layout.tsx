import "./globals.css";
import type { Metadata } from "next";
import { Cabin_Condensed } from "next/font/google";
import Header from "./header";

const condensed = Cabin_Condensed({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Quiz",
  description: "Quiz with app for creating managing quizzes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href="/logo.ico" />
      <body className={condensed.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
