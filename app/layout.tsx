import Header from "./components/layout/Header";
import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        
        <Providers>
          <Header />{children}</Providers>
      </body>
    </html>
  );
}