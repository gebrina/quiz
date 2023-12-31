import "./globals.css";
import type { Metadata } from "next";
import { Cabin_Condensed } from "next/font/google";
import Header from "./header";
import { ApolloWrapper } from "./ApolloWrapper";
import QuizContextProvider from "./context/quiz";

const condensed = Cabin_Condensed({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Quiz +",
  description: "Quiz with app for creating managing quizzes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <body className={`${condensed.className} bg-cover`}>
        <QuizContextProvider>
          <Header />
          <ApolloWrapper>{children}</ApolloWrapper>
        </QuizContextProvider>
      </body>
    </html>
  );
}
