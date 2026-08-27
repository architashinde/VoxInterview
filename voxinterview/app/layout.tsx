import type { Metadata } from "next";
import { Mona_Sans, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const monaSans = Mona_Sans({
  variable: "--font-monasans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VoxInterview",
  description: "An AI powered mock interview platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("dark", "font-sans", inter.variable)}
    >
      <body className={`${monaSans.className} antialiased pattern`}>{children}
        <Toaster/>
      </body>
    </html>
  );
}
