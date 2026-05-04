// Import type for metadata (SEO information)
import type { Metadata } from "next";

// Import Google fonts from Next.js
import { Geist, Geist_Mono } from "next/font/google";

// Import Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import Bootstrap icons
import "bootstrap-icons/font/bootstrap-icons.css";

// Import global custom CSS
import "./globals.css";

// Import toast notification container
import { Toaster } from "react-hot-toast";

// Configure Geist Sans font
const geistSans = Geist({
  variable: "--font-geist-sans", // CSS variable name
  subsets: ["latin"],            // character set
});

// Configure Geist Mono font (for code / monospace)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Page metadata (used for browser title & SEO)
export const metadata: Metadata = {
  title: "Task Manager Admin",
  description: "Next.js Firebase Task Manager",
};

// Root layout component (wraps entire app)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Body contains all pages */}
      <body>

        {/* Render all pages here */}
        {children}

        {/* Toast notification container (top-right position) */}
        <Toaster position="top-right" />

      </body>
    </html>
  );
}