import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { FilterProvider } from "@/context/FilterContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "YallaShop",
  description:
    "Shop electronics, fashion, home & kitchen, beauty products and more at YallaShop.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <CartProvider>
          <FilterProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </FilterProvider>
        </CartProvider>
      </body>
    </html>
  );
}
