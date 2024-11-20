import { Inter } from "next/font/google";
import "@/styles/globals.css";

import Heading from "@/components/site/Heading";
import Footer from "@/components/site/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SambaNova Clips",
  description: "Create videos from your Hashnode blog posts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Heading />

        {children}

        <Footer />
      </body>
    </html>
  );
}