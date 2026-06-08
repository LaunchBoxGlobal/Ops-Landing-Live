import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata = {
  title: "Top Software Development Agency | Custom Software Solutions",
  description:
    "Leading software development agency delivering custom app development and software engineering solutions to drive your business growth and digital success.",
  alternates: {
    canonical: "https://launchboxglobal.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`overflow-x-hidden ${outfit.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
