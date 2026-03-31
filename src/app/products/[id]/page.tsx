'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ShoppingCart, Plus, Minus, ArrowLeft, Star } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { toast } from 'sonner'

interface Product {
  id: string
  name_th: string
  description_th: string
  price: number
  image_url: string
  category: string
  in_stock: boolean
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const router = useRouter()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  useEffect(() => {
    async function fetchProduct() {
      try {
        console.log('🚀 Starting to fetch product with ID:', productId)
        console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
        
        // Test connection first
        const connectionTest = await supabase.from('products').select('count').limit(1)
        console.log('📊 Connection test result:', connectionTest)
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single()

        console.log('📦 Raw Supabase response:', JSON.stringify({data, error}))

        if (error) {
          console.error('❌ Error:', JSON.stringify(error), error?.message, error?.code)
          console.error('Error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          })
          
          // Fallback to sample data
          console.log('🔄 Using fallback sample data...')
          const sampleProduct: Product = {
            id: productId.includes('-') ? productId : '00000000-0000-0000-0000-000000000001',
            name_th: 'เมล่อนฮันนี่สวีท',
            description_th: 'เมล่อนฮันนี่สวีทคุณภาพเยี่ยมจากฟาร์มของเรา เป็นพันธุ์เมล่อนที่มีความหวานกรอบ น้ำมาก และมีกลิ่นหอมเฉพาะตัว ปลูกด้วยวิธีการเกษตรอินทรีย์ ไม่ใช้สารเคมีอันตราย จึงมั่นใจได้ว่าปลอดภัยต่อสุขภาพ และเหมาะสำหรับทุกคนในครอบครัว เมล่อนของเราเลือกสรรมาอย่างดี สุกพอดี พร้อมรับประทานทันที หรือจะเก็บไว้ในตู้เย็นก็ได้นานถึง 7 วัน',
            price: 120.00,
            image_url: '/api/placeholder/600/400',
            category: 'เมล่อน',
            in_stock: true
          }
          setProduct(sampleProduct)
        } else {
          console.log('✅ Successfully fetched product:', data?.name_th)
          console.log('📋 Product data:', data)
          setProduct(data)
        }
      } catch (error) {
        console.error('💥 Unexpected error in fetchProduct:', error)
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack available')
      } finally {
        console.log('🏁 Fetch operation completed')
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const addToCart = () => {
    if (product && quantity > 0 && product.in_stock) {
      // Add multiple quantity using addItem multiple times
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          name_th: product.name_th,
          price: product.price,
          image_url: product.image_url,
          category: product.category
        })
      }
      toast.success('เพิ่มสินค้าในตะกร้าแล้ว')
    }
  }

  const buyNow = () => {
    if (product && quantity > 0 && product.in_stock) {
      // Add to cart first
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          name_th: product.name_th,
          price: product.price,
          image_url: product.image_url,
          category: product.category
        })
      }
      // Redirect to checkout
      router.push('/checkout')
    }
  }

  const incrementQuantity = () => {
    if (product && product.in_stock && quantity < 10) {
      setQuantity(prev => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf6ec]">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="w-full h-96 rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fdf6ec]">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-[#3d3b30] mb-4">ไม่พบสินค้า</h2>
            <p className="text-[#5c5346] mb-8">สินค้าที่คุณค้นหาไม่มีอยู่ในระบบ</p>
            <Link href="/products">
              <Button className="bg-[#5d6e45] hover:bg-[#4a5737] text-white">
                กลับไปดูสินค้า
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fdf6ec]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/products" className="inline-flex items-center text-[#5d6e45] hover:text-[#4a5737] mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          กลับไปดูสินค้า
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="border-gray-200 overflow-hidden">
              <CardContent className="p-0">
                <div className="w-full aspect-[4/3] bg-[#e8e0d0] flex items-center justify-center rounded-lg">
                  <span className="text-[#5d6e45] font-medium text-lg">ภาพสินค้า</span>
                </div>
              </CardContent>
            </Card>

            {/* Small thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-[#e8e0d0] rounded-lg flex items-center justify-center">
                  <span className="text-[#6b7b53] text-xs">รูป {i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary" className="bg-[#e8e0d0] text-[#5d6e45]">
                  {product.category}
                </Badge>
                {product.in_stock ? (
                  <Badge variant="secondary" className="bg-[#e8e0d0] text-[#5d6e45]">
                    มีสินค้า
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="bg-[#c4705a]">หมดสต็อก</Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name_th}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#b3bfa0] text-[#b3bfa0]" />
                  ))}
                </div>
                <span className="text-[#5c5346]">(5.0) • 15 รีวิว</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-[#5d6e45] mb-6">
                ฿{product.price.toFixed(2)}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">รายละเอียดสินค้า</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description_th}
              </p>
            </div>

            {/* Stock Info */}
            <div className="bg-[#f5f1e8] p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-[#5c5346]">สถานะสินค้า:</span>
                <span className="font-semibold text-[#5d6e45]">
                  {product.in_stock ? 'มีสินค้า' : 'หมดสต็อก'}
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            {product.in_stock && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">จำนวนที่ต้องการ</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="h-10 w-10 rounded-none"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <div className="w-16 text-center font-medium">
                      {quantity}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={incrementQuantity}
                      disabled={quantity >= 10}
                      className="h-10 w-10 rounded-none"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-600">
                    รวม: ฿{(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                className="flex-1 bg-[#5d6e45] hover:bg-[#4a5737] text-white py-3"
                onClick={addToCart}
                disabled={!product.in_stock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.in_stock ? 'หยิบใส่ตะกร้า' : 'สินค้าหมด'}
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#5d6e45] text-[#5d6e45] hover:bg-[#e8ebe0] py-3"
                onClick={buyNow}
                disabled={!product.in_stock}
              >
                ซื้อเลย
              </Button>
            </div>

            {/* Additional Info */}
            <div className="border-t border-[#e3dcc9] pt-6">
              <h3 className="text-lg font-semibold text-[#3d3b30] mb-4">ข้อมูลเพิ่มเติม</h3>
              <div className="space-y-3 text-sm">
                <div className="flex">
                  <span className="text-[#5c5346] w-24">วันที่ผลิต:</span>
                  <span className="text-[#3d3b30]">28/03/2026</span>
                </div>
                <div className="flex">
                  <span className="text-[#5c5346] w-24">วันหมดอายุ:</span>
                  <span className="text-[#3d3b30]">04/04/2026</span>
                </div>
                <div className="flex">
                  <span className="text-[#5c5346] w-24">ขนส่ง:</span>
                  <span className="text-[#3d3b30]">ส่งฟรีเมื่อซื้อครบ 500 บาท</span>
                </div>
                <div className="flex">
                  <span className="text-[#5c5346] w-24">การจัดเก็บ:</span>
                  <span className="text-[#3d3b30]">เก็บในตู้เย็น 2-4°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
