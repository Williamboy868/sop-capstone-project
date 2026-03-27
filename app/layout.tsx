import type { Metadata } from "next";
import { DM_Sans, Lora, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import BetterAuthUIProvider from "@/providers/better-auth-ui-provider";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});


export const metadata: Metadata = {
  title: "Shoprite",
  description: "Point of Sale System for Shoprite",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛒</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}>
        <ThemeProvider>
          <BetterAuthUIProvider>{children}</BetterAuthUIProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

