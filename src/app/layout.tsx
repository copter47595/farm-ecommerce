import type { Metadata } from "next";
import { Sarabun, Anuphan } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/sonner";

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const anuphan = Anuphan({
  variable: "--font-anuphan",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ฟาร์มพึ่งหนุ่ม - สินค้าคุณภาพจากฟาร์ม ส่งตรงถึงบ้านคุณ",
  description: "ฟาร์มอินทรีย์ที่มุ่งมั่นส่งมอบผลิตภัณฑ์คุณภาพจากฟาร์มถึงบ้านคุณ เมล่อน ผักสด ของแปรรูป เครื่องดื่ม และผลิตภัณฑ์ทำความสะอาด",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${sarabun.variable} ${anuphan.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[var(--font-anuphan)]">
        <CartProvider>
          {children}
        </CartProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
