import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlgoPanel",
  description: "An AI-powered platform for preparing for mock interviews.",
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { UserProvider } from "@/contexts/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${monaSans.className} antialiased pattern`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider initialUser={null}>
            {children}
            <Toaster />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
