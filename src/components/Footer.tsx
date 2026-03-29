import Link from 'next/link'
import { Phone, MessageCircle, MapPin, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Store Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">ฟ</span>
              </div>
              <h3 className="text-xl font-bold">ฟาร์มพึ่งหนุ่ม</h3>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              สินค้าคุณภาพจากฟาร์มของเรา สดใหม่ทุกวัน 
              ปลอดภัย และเชื่อถือได้ ส่งตรงถึงบ้านคุณ
            </p>

            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-green-400" />
                <span>089-123-4567</span>
              </div>
              
              <div className="flex items-center text-gray-300">
                <MessageCircle className="w-5 h-5 mr-3 text-green-400" />
                <span>Line ID: @farmpeangnum</span>
              </div>
              
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-green-400" />
                <span>123 หมู่ 4 ต.ทุ่งสองห้อง อ.เมือง จ.ขอนแก่น 40000</span>
              </div>

              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-green-400" />
                <span>info@farmpeangnum.com</span>
              </div>

              <div className="flex items-center text-gray-300">
                <Clock className="w-5 h-5 mr-3 text-green-400" />
                <span>เปิดทำการ: 06:00 - 18:00 น.</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">ลิงก์ด่วน</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-green-400 transition-colors">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-green-400 transition-colors">
                  สินค้าทั้งหมด
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-green-400 transition-colors">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-green-400 transition-colors">
                  ติดต่อเรา
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-green-400 transition-colors">
                  คำถามที่พบบ่อย
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">หมวดหมู่สินค้า</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=vegetables" className="text-gray-300 hover:text-green-400 transition-colors">
                  ผักสด
                </Link>
              </li>
              <li>
                <Link href="/products?category=fruits" className="text-gray-300 hover:text-green-400 transition-colors">
                  ผลไม้
                </Link>
              </li>
              <li>
                <Link href="/products?category=eggs" className="text-gray-300 hover:text-green-400 transition-colors">
                    ไข่
                </Link>
              </li>
              <li>
                <Link href="/products?category=grains" className="text-gray-300 hover:text-green-400 transition-colors">
                  ข้าวและธัญพืช
                </Link>
              </li>
              <li>
                <Link href="/products?category=herbs" className="text-gray-300 hover:text-green-400 transition-colors">
                  สมุนไพร
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
              >
                <span className="text-sm">f</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
              >
                <span className="text-sm">📷</span>
              </a>
              <a 
                href="https://line.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2026 ฟาร์มพึ่งหนุ่ม. สงวนลิขสิทธิ์
              </p>
              <p className="text-gray-500 text-xs mt-1">
                พัฒนาด้วย Next.js และความหลงใหลในการเกษตร
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
