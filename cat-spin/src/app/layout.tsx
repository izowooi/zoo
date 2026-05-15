import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casino Roulette",
  description: "카지노 스타일 룰렛 웹앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
