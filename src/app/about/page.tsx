import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Leaf, Truck, Heart, Users, Award, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา - ฟาร์มพึ่งหนุ่ม',
  description: 'เรียนรู้เรื่องราวของฟาร์มพึ่งหนุ่ม ฟาร์มอินทรีย์ที่มุ่งมั่นส่งมอบผลิตภัณฑ์คุณภาพจากฟาร์มถึงบ้านคุณ',
}

const values = [
  {
    icon: Leaf,
    title: 'ปลอดภัย',
    description: 'ปลูกด้วยวิธีการเกษตรอินทรีย์ ไม่ใช้สารเคมีอันตราย ผ่านการตรวจสอบคุณภาพทุกขั้นตอน',
  },
  {
    icon: Truck,
    title: 'สดใหม่',
    description: 'เก็บเกี่ยวสดใหม่ทุกวัน ส่งตรงจากฟาร์มถึงมือคุณภายใน 24 ชั่วโมง',
  },
  {
    icon: Heart,
    title: 'ส่งตรงจากฟาร์ม',
    description: 'ผลิตภัณฑ์จากฟาร์มของเราโดยตรง ไม่ผ่านคนกลาง มั่นใจในคุณภาพทุกชิ้น',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fdf6ec]">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-[#5d6e45] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                ฟาร์มพึ่งหนุ่ม
              </h1>
              <p className="text-xl text-[#d1d7c3] max-w-3xl mx-auto leading-relaxed">
                ฟาร์มอินทรีย์ที่มุ่งมั่นส่งมอบผลิตภัณฑ์คุณภาพจากฟาร์มถึงบ้านคุณ
                ด้วยความใส่ใจในทุกขั้นตอนการผลิต
              </p>
            </div>
          </div>
        </section>

        {/* Farm Story */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative">
                <div className="aspect-[4/3] bg-[#e8e0d0] rounded-2xl flex items-center justify-center">
                  <span className="text-[#5d6e45] text-lg font-medium">ภาพฟาร์ม</span>
                </div>
                <Badge className="absolute top-4 left-4 bg-[#5d6e45] text-white">
                  <Award className="w-4 h-4 mr-1" />
                  ก่อตั้ง 2020
                </Badge>
              </div>

              {/* Story */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  เรื่องราวของฟาร์มเรา
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    ฟาร์มพึ่งหนุ่มก่อตั้งขึ้นในปี 2020 จากความตั้งใจของคุณพึ่งและหนุ่ม 
                    ที่ต้องการสร้างฟาร์มอินทรีย์ที่ผลิตอาหารสะอาด ปลอดภัย 
                    และมีคุณภาพสูงสำหรับครอบครัวไทย
                  </p>
                  <p>
                    เริ่มต้นจากการปลูกผักสวนครัวเล็กๆ จนขยายเป็นฟาร์มขนาดกลาง 
                    ที่มีการปลูกเมล่อน ผักสด ผลไม้ตามฤดูกาล และผลิตภัณฑ์แปรรูปต่างๆ 
                    โดยใช้หลักการเกษตรอินทรีย์ที่เป็นมิตรต่อสิ่งแวดล้อม
                  </p>
                  <p>
                    วันนี้ฟาร์มพึ่งหนุ่มได้ส่งมอบผลิตภัณฑ์คุณภาพให้กับลูกค้าหลายพันครอบครัว 
                    และยังคงมุ่งมั่นพัฒนาคุณภาพอย่างต่อเนื่อง เพื่อให้ทุกครอบครัวได้รับ 
                    อาหารที่ดีที่สุดจากฟาร์มของเรา
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ค่านิยมของเรา
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                สิ่งที่เรายึดมั่นในการทำงานเพื่อให้ได้มาซึ่งผลิตภัณฑ์คุณภาพสูงสุด
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index} className="border-[#e3dcc9] hover:shadow-lg transition-shadow bg-[#faf8f3]">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-[#e8e0d0] rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-[#5d6e45]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#3d3b30] mb-3">
                        {value.title}
                      </h3>
                      <p className="text-[#5c5346] leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ทีมงานของเรา
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                คนที่อยู่เบื้องหลังความสำเร็จของฟาร์มพึ่งหนุ่ม
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Founder 1 */}
              <Card className="border-[#e3dcc9] bg-white">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 bg-[#e8e0d0] rounded-full flex items-center justify-center mb-6">
                      <Users className="w-12 h-12 text-[#5d6e45]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#3d3b30] mb-2">
                      คุณพึ่ง
                    </h3>
                    <p className="text-[#5d6e45] font-medium mb-3">ผู้ก่อตั้ง</p>
                    <p className="text-[#5c5346] text-sm leading-relaxed">
                      เริ่มต้นจากความรักในการปลูกผักและต้องการให้ครอบครัวได้กินอาหารที่ปลอดภัย 
                      จึงก่อตั้งฟาร์มพึ่งหนุ่มขึ้นมาด้วยความตั้งใจ
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Founder 2 */}
              <Card className="border-[#e3dcc9] bg-white">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 bg-[#e8e0d0] rounded-full flex items-center justify-center mb-6">
                      <MapPin className="w-12 h-12 text-[#5d6e45]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#3d3b30] mb-2">
                      คุณหนุ่ม
                    </h3>
                    <p className="text-[#5d6e45] font-medium mb-3">ผู้ก่อตั้ง</p>
                    <p className="text-[#5c5346] text-sm leading-relaxed">
                      ดูแลการจัดการฟาร์มและพัฒนาระบบการผลิตให้มีประสิทธิภาพ 
                      พร้อมทั้งค้นคว้าเทคนิคใหม่ๆ ในการปลูกพืชแบบอินทรีย์
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-[#5d6e45]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">5+</p>
                <p className="text-[#d1d7c3]">ปีของการดำเนินงาน</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">1000+</p>
                <p className="text-[#d1d7c3]">ครอบครัวที่ให้ความไว้วางใจ</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">50+</p>
                <p className="text-[#d1d7c3]">ไร่ของพื้นที่ปลูก</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">20+</p>
                <p className="text-[#d1d7c3]">ชนิดของผลิตภัณฑ์</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
