import { Metadata } from 'next'
import ContactForm from './ContactForm'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ติดต่อเรา - ฟาร์มพึ่งหนุ่ม',
  description: 'ติดต่อฟาร์มพึ่งหนุ่ม สอบถามข้อมูลสินค้า หรือส่งข้อความถึงเรา',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fdf6ec]">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-[#5d6e45] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                ติดต่อเรา
              </h1>
              <p className="text-xl text-[#d1d7c3] max-w-3xl mx-auto leading-relaxed">
                มีคำถามหรือต้องการสอบถามข้อมูล? ติดต่อเราได้ทุกช่องทาง
                ทีมงานยินดีให้บริการ
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  ส่งข้อความถึงเรา
                </h2>
                <ContactForm />
              </div>

              {/* Farm Info */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  ข้อมูลติดต่อ
                </h2>

                <div className="space-y-6">
                  <Card className="border-[#e3dcc9] bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-[#e8e0d0] rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-[#5d6e45]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#3d3b30] mb-1">ที่อยู่ฟาร์ม</h3>
                          <p className="text-[#5c5346]">
                            123 หมู่ 4 ต.ทุ่งสองห้อง<br />
                            อ.เมือง จ.ขอนแก่น 40000
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#e3dcc9] bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-[#e8e0d0] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-[#5d6e45]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#3d3b30] mb-1">เบอร์โทรศัพท์</h3>
                          <p className="text-[#5c5346]">089-123-4567</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#e3dcc9] bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-[#e8e0d0] rounded-lg flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-6 h-6 text-[#5d6e45]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#3d3b30] mb-1">Line ID</h3>
                          <p className="text-[#5c5346]">@farmpeangnum</p>
                          <p className="text-sm text-[#6b6b5e] mt-1">
                            แอดไลน์เพื่อรับข่าวสารและโปรโมชั่น
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#e3dcc9] bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-[#e8e0d0] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-[#5d6e45]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#3d3b30] mb-1">เวลาทำการ</h3>
                          <div className="text-[#5c5346] space-y-1">
                            <p>จันทร์ - เสาร์: 08:00 - 18:00 น.</p>
                            <p>อาทิตย์: 08:00 - 12:00 น.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Google Maps Placeholder */}
            <div className="mt-16">
              <Card className="border-gray-200 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[21/9] bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Google Maps Embed</p>
                      <p className="text-sm text-gray-400 mt-1">
                        วางโค้ด iframe Google Maps ที่นี่
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
