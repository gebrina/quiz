import "./globals.css";
import type { Metadata } from "next";
import { Cabin_Condensed } from "next/font/google";

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
      <body className={condensed.className}>{children}</body>
    </html>
  );
}
