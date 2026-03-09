import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emiliano Arcos — Portfolio",
  description: "Industrial & Systems Engineering Student. Python, React, Data Analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-[#050508] text-[#e8e8f0] antialiased">
        {children}
      </body>
    </html>
  );
}
