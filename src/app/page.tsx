import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import About from '@/components/About'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ฟาร์มพึ่งหนุ่ม - สินค้าคุณภาพจากฟาร์ม ส่งตรงถึงบ้านคุณ',
  description: 'ฟาร์มอินทรีย์ที่มุ่งมั่นส่งมอบผลิตภัณฑ์คุณภาพจากฟาร์มถึงบ้านคุณ เมล่อน ผักสด ของแปรรูป เครื่องดื่ม และผลิตภัณฑ์ทำความสะอาด',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fdf6ec]">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <About />
      </main>
      <Footer />
    </div>
  )
}
