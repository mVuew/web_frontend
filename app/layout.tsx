import { Footer } from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./globals.css";
import { Providers } from "./providers";
import { Inter, Kanit } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const kanit = Kanit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-kanit",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={` ${inter.variable} ${kanit.variable} antialiased`}
      suppressHydrationWarning={true}
    >
      <body>
        <Providers>
          <Header />
          {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
