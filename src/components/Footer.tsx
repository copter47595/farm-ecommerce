import Link from 'next/link'
import { Phone, MessageCircle, MapPin, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#3d3b30] text-[#f5f1e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Store Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-[#5d6e45] rounded-xl flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(93,110,69,0.3)]">
                <span className="text-[#faf8f3] font-bold text-lg">ฟ</span>
              </div>
              <h3 className="text-xl font-bold text-[#faf8f3]">ฟาร์มพึ่งหนุ่ม</h3>
            </div>
            
            <p className="text-[#b3bfa0] mb-7 leading-relaxed max-w-md">
              สินค้าคุณภาพจากฟาร์มของเรา สดใหม่ทุกวัน 
              ปลอดภัย และเชื่อถือได้ ส่งตรงถึงบ้านคุณ
            </p>

            <div className="space-y-3">
              <div className="flex items-center text-[#d1d7c3]">
                <Phone className="w-5 h-5 mr-3 text-[#b3bfa0]" />
                <span>089-123-4567</span>
              </div>
              
              <div className="flex items-center text-[#d1d7c3]">
                <MessageCircle className="w-5 h-5 mr-3 text-[#b3bfa0]" />
                <span>Line ID: @farmpeangnum</span>
              </div>
              
              <div className="flex items-center text-[#d1d7c3]">
                <MapPin className="w-5 h-5 mr-3 text-[#b3bfa0]" />
                <span>123 หมู่ 4 ต.ทุ่งสองห้อง อ.เมือง จ.ขอนแก่น 40000</span>
              </div>

              <div className="flex items-center text-[#d1d7c3]">
                <Mail className="w-5 h-5 mr-3 text-[#b3bfa0]" />
                <span>info@farmpeangnum.com</span>
              </div>

              <div className="flex items-center text-[#d1d7c3]">
                <Clock className="w-5 h-5 mr-3 text-[#b3bfa0]" />
                <span>เปิดทำการ: 06:00 - 18:00 น.</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-[#faf8f3]">ลิงก์ด่วน</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-[#d1d7c3] hover:text-[#b3bfa0] transition-colors">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[#d1d7c3] hover:text-[#b3bfa0] transition-colors">
                  สินค้าทั้งหมด
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#d1d7c3] hover:text-[#b3bfa0] transition-colors">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#d1d7c3] hover:text-[#b3bfa0] transition-colors">
                  ติดต่อเรา
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#d1d7c3] hover:text-[#b3bfa0] transition-colors">
                  คำถามที่พบบ่อย
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-[#faf8f3]">หมวดหมู่สินค้า</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=vegetables" className="text-[#d1d7c3] hover:text-[#b3bfa0] transition-colors">
                  ผักสด
                </Link>
              </li>
              <li>
                <Link href="/products?category=fruits" className="text-[#d1d7c3] hover:text-[#b3bfa0] transition-colors">
                  ผลไม้
                </Link>
              </li>
              <li>
                <Link href="/products?category=eggs" className="text-[#d1d7c3] hover:text-[#b3bfa0] transition-colors">
                    ไข่
                </Link>
              </li>
              <li>
                <Link href="/products?category=grains" className="text-[#d1d7c3] hover:text-[#b3bfa0] transition-colors">
                  ข้าวและธัญพืช
                </Link>
              </li>
              <li>
                <Link href="/products?category=herbs" className="text-[#d1d7c3] hover:text-[#b3bfa0] transition-colors">
                  สมุนไพร
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-[#4a4237] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-5 md:mb-0">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 bg-[#4a4237] rounded-xl flex items-center justify-center hover:bg-[#5d6e45] transition-colors"
              >
                <span className="text-sm">f</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 bg-[#4a4237] rounded-xl flex items-center justify-center hover:bg-[#5d6e45] transition-colors"
              >
                <span className="text-sm">📷</span>
              </a>
              <a 
                href="https://line.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 bg-[#4a4237] rounded-xl flex items-center justify-center hover:bg-[#5d6e45] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-[#b3bfa0] text-sm">
                © 2026 ฟาร์มพึ่งหนุ่ม. สงวนลิขสิทธิ์
              </p>
              <p className="text-[#6b7b53] text-xs mt-1">
                พัฒนาด้วยความหลงใหลในการเกษตร
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
