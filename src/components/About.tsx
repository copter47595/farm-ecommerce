import { Card, CardContent } from '@/components/ui/card'
import { Heart, Leaf, Users } from 'lucide-react'

export default function About() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              เกี่ยวกับ <span className="text-green-700">ฟาร์มพึ่งหนุ่ม</span>
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p className="text-lg">
                ฟาร์มพึ่งหนุ่มเกิดจากความหลงใหลในการเพาะปลูกสินค้าคุณภาพเยี่ยม 
                ด้วยประสบการณ์มากกว่า 10 ปี เรามุ่งมั่นในการผลิตผักและผลไม้สดใหม่ 
                ที่ปลอดภัยและเชื่อถือได้
              </p>
              
              <p>
                เราใช้วิธีการเกษตรอินทรีย์ที่เป็นมิตรต่อสิ่งแวดล้อม 
                ไม่ใช้สารเคมีอันตราย และใส่ใจในทุกขั้นตอนการผลิต 
                ตั้งแต่การเลือกพันธุ์ การดูแลรักษา ไปจนถึงการส่งมอบสินค้าถึงมือลูกค้า
              </p>
              
              <p>
                ด้วยความตั้งใจที่จะให้ลูกค้าได้รับสินค้าที่สดใหม่และมีคุณค่าทางโภชนาการสูงสุด 
                เราจึงคัดสรรแต่สินค้าที่ดีที่สุดเพื่อส่งตรงถึงบ้านคุณ
              </p>
            </div>

            {/* Values */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="text-center p-4 border-green-200">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-green-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">เลี้ยงใจ</h3>
                  <p className="text-sm text-gray-600">ดูแลด้วยใจจริง</p>
                </CardContent>
              </Card>

              <Card className="text-center p-4 border-green-200">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-6 h-6 text-green-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">ธรรมชาติ</h3>
                  <p className="text-sm text-gray-600">ปลอดสารพิษ</p>
                </CardContent>
              </Card>

              <Card className="text-center p-4 border-green-200">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-green-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">ความไว้วางใจ</h3>
                  <p className="text-sm text-gray-600">เชื่อถือได้</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl font-bold">ฟ</span>
                </div>
                <p className="text-green-700 font-medium">ภาพฟาร์มของเรา</p>
                <p className="text-green-600 text-sm mt-2">สวยงามและเป็นธรรมชาติ</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-50 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-green-700 mb-2">10+</div>
            <div className="text-gray-600">ปีประสบการณ์</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-700 mb-2">1000+</div>
            <div className="text-gray-600">ลูกค้าที่ไว้วางใจ</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-700 mb-2">50+</div>
            <div className="text-gray-600">รายการสินค้า</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-700 mb-2">100%</div>
            <div className="text-gray-600">ความพึงพอใจ</div>
          </div>
        </div>
      </div>
    </section>
  )
}
