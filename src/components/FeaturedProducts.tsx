'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { supabase } from '@/lib/supabase'

interface Product {
  id: string
  name_th: string
  description_th: string
  price: number
  image_url: string
  category: string
  in_stock: boolean
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        console.log('🚀 Starting to fetch featured products...')
        console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
        
        // Direct connection test first
        const { data: testData, error: testError } = await supabase.from('products').select('*').limit(4)
        console.log('📊 Direct test data:', testData)
        console.log('📊 Direct test error:', JSON.stringify(testError))
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('featured', true)
          .eq('in_stock', true)
          .order('created_at', { ascending: false })
          .limit(4)

        console.log('📦 Raw Supabase response:', JSON.stringify({data, error}))

        if (error) {
          console.error('❌ Error:', JSON.stringify(error), error?.message, error?.code)
          console.error('Error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          })
          
          // Fallback to sample data if Supabase is not configured
          console.log('🔄 Using fallback sample data...')
          setProducts([
            {
              id: '00000000-0000-0000-0000-000000000001',
              name_th: 'ผักกาดสดจากฟาร์ม',
              description_th: 'ผักกาดสดปลอดสารพิษจากฟาร์มของเรา สะอาดปลอดภัย',
              price: 25.00,
              image_url: '/api/placeholder/300/200',
              category: 'vegetables',
              in_stock: true
            },
            {
              id: '00000000-0000-0000-0000-000000000002',
              name_th: 'มะเขือเทศออร์แกนิค',
              description_th: 'มะเขือเทศสุกสีแดง หวานอร่อยจากธรรมชาติ',
              price: 40.00,
              image_url: '/api/placeholder/300/200',
              category: 'vegetables',
              in_stock: true
            },
            {
              id: '00000000-0000-0000-0000-000000000003',
              name_th: 'ไข่ไก่ฟาร์ม',
              description_th: 'ไข่ไก่สดใหม่จากไก่ที่เลี้ยงในฟาร์ม',
              price: 120.00,
              image_url: '/api/placeholder/300/200',
              category: 'eggs',
              in_stock: true
            },
            {
              id: '00000000-0000-0000-0000-000000000004',
              name_th: 'ข้าวหอมมะลิ',
              description_th: 'ข้าวหอมมะลิคุณภาพเยี่ยมจากฟาร์ม',
              price: 150.00,
              image_url: '/api/placeholder/300/200',
              category: 'grains',
              in_stock: true
            }
          ])
        } else {
          console.log('✅ Successfully fetched products:', data?.length || 0, 'items')
          console.log('📋 Product data:', data)
          setProducts(data || [])
        }
      } catch (error) {
        console.error('💥 Unexpected error in fetchFeaturedProducts:', error)
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack available')
      } finally {
        console.log('🏁 Fetch operation completed')
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">สินค้าแนะนำ</h2>
            <p className="text-gray-600">กำลังโหลดสินค้า...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">สินค้าแนะนำ</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            สินค้าคุณภาพเยี่ยมจากฟาร์มของเรา สดใหม่ทุกวัน
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 border-gray-200">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                      <span className="text-green-700 text-sm font-medium">ภาพสินค้า</span>
                    </div>
                  </div>
                  {product.category && (
                    <Badge 
                      variant="secondary" 
                      className="absolute top-2 left-2 bg-white/90 text-green-700"
                    >
                      {product.category}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  {product.name_th}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description_th}
                </p>
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(5.0)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-700">
                    ฿{product.price.toFixed(2)}
                  </span>
                  {product.in_stock ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      มีสินค้า
                    </Badge>
                  ) : (
                    <Badge variant="destructive">หมดสต็อก</Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <div className="flex gap-2 w-full">
                  <Button 
                    className="flex-1 bg-green-700 hover:bg-green-800 text-white"
                    disabled={!product.in_stock}
                    onClick={() => addItem({
                      id: product.id,
                      name_th: product.name_th,
                      price: product.price,
                      image_url: product.image_url,
                      category: product.category
                    })}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    เพิ่มลงตะกร้า
                  </Button>
                  <Link href={`/products/${product.id}`} className="flex-1">
                    <Button 
                      variant="outline" 
                      className="w-full border-green-700 text-green-700 hover:bg-green-50"
                    >
                      ดูรายละเอียด
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button 
              variant="outline" 
              size="lg"
              className="border-green-700 text-green-700 hover:bg-green-50 px-8"
            >
              ดูสินค้าทั้งหมด
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
