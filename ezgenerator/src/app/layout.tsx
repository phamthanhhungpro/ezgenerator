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
      <body className={inter.className}>
      <a href="https://t.me/sptoolsfree"
        style={{ position: "fixed", bottom: 0, right: 0, margin: 20, zIndex: 999, borderRadius: "50%" }} target="_blank"
        rel="nofollow" className="tm-btn btn-dark">
        <img width="60px" height="60px" alt="Temp Mail Extension for Telegram" className="lazy" src="./telegram.svg"/>
      </a>
        {children}
        </body>
    </html>
  );
}
