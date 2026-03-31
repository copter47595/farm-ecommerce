import { Card, CardContent } from '@/components/ui/card'
import { Heart, Leaf, Users } from 'lucide-react'

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-[#5d6e45] font-medium text-sm tracking-wider uppercase mb-3 block">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3d3b30] mb-8 leading-tight">
              เกี่ยวกับ <span className="text-[#5d6e45]">ฟาร์มพึ่งหนุ่ม</span>
            </h2>
            
            <div className="space-y-5 text-[#5c5346] leading-relaxed">
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
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Card className="text-center p-5 border-[#e3dcc9] bg-[#faf8f3] rounded-2xl">
                <CardContent className="p-0">
                  <div className="w-14 h-14 bg-[#e8ebe0] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-7 h-7 text-[#c4705a]" />
                  </div>
                  <h3 className="font-semibold text-[#3d3b30] mb-1">เลี้ยงใจ</h3>
                  <p className="text-sm text-[#5c5346]">ดูแลด้วยใจจริง</p>
                </CardContent>
              </Card>

              <Card className="text-center p-5 border-[#e3dcc9] bg-[#faf8f3] rounded-2xl">
                <CardContent className="p-0">
                  <div className="w-14 h-14 bg-[#e8ebe0] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-7 h-7 text-[#5d6e45]" />
                  </div>
                  <h3 className="font-semibold text-[#3d3b30] mb-1">ธรรมชาติ</h3>
                  <p className="text-sm text-[#5c5346]">ปลอดสารพิษ</p>
                </CardContent>
              </Card>

              <Card className="text-center p-5 border-[#e3dcc9] bg-[#faf8f3] rounded-2xl">
                <CardContent className="p-0">
                  <div className="w-14 h-14 bg-[#e8ebe0] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-[#5d6e45]" />
                  </div>
                  <h3 className="font-semibold text-[#3d3b30] mb-1">ความไว้วางใจ</h3>
                  <p className="text-sm text-[#5c5346]">เชื่อถือได้</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#e8ebe0] to-[#d1d7c3] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-28 h-28 bg-[#5d6e45] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_8px_32px_-8px_rgba(93,110,69,0.3)]">
                  <span className="text-white text-4xl font-bold">ฟ</span>
                </div>
                <p className="text-[#5d6e45] font-medium text-lg">ภาพฟาร์มของเรา</p>
                <p className="text-[#6b7b53] text-sm mt-2">สวยงามและเป็นธรรมชาติ</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#e8ebe0] rounded-full opacity-60"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#f5f1e8] rounded-full opacity-60"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-[#faf8f3] rounded-2xl">
            <div className="text-4xl font-bold text-[#5d6e45] mb-2">10+</div>
            <div className="text-[#5c5346]">ปีประสบการณ์</div>
          </div>
          <div className="p-6 bg-[#faf8f3] rounded-2xl">
            <div className="text-4xl font-bold text-[#5d6e45] mb-2">1000+</div>
            <div className="text-[#5c5346]">ลูกค้าที่ไว้วางใจ</div>
          </div>
          <div className="p-6 bg-[#faf8f3] rounded-2xl">
            <div className="text-4xl font-bold text-[#5d6e45] mb-2">50+</div>
            <div className="text-[#5c5346]">รายการสินค้า</div>
          </div>
          <div className="p-6 bg-[#faf8f3] rounded-2xl">
            <div className="text-4xl font-bold text-[#5d6e45] mb-2">100%</div>
            <div className="text-[#5c5346]">ความพึงพอใจ</div>
          </div>
        </div>
      </div>
    </section>
  )
}
