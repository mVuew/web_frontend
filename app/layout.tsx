import "./globals.css";
import { Providers } from "./providers";
import { siteFont } from "../constants/site-font";
import { themeCssVariables } from "../constants/colors";
import type { CSSProperties } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${siteFont.variable} antialiased`}
      style={themeCssVariables as CSSProperties}
      suppressHydrationWarning={true}
    >
      <body
        className={`bg-background text-foreground transition-colors duration-300 ${siteFont.className}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
