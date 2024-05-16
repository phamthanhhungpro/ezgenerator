'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
 // import Font Awesome CSS
 import "@fortawesome/fontawesome-svg-core/styles.css";
 import { config } from "@fortawesome/fontawesome-svg-core";
 config.autoAddCss = false;
 
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="-lPnpQY3npvXBA2AovIMUwhCr8A87FsQolziiMJwDmo" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
