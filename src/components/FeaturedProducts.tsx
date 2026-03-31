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
      <section className="py-20 bg-[#f5f1e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3d3b30] mb-4">สินค้าแนะนำ</h2>
            <p className="text-[#5c5346] text-lg">กำลังโหลดสินค้า...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-[#f5f1e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#5d6e45] font-medium text-sm tracking-wider uppercase mb-2 block">
            Featured Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#3d3b30] mb-4">สินค้าแนะนำ</h2>
          <p className="text-lg text-[#5c5346] max-w-2xl mx-auto leading-relaxed">
            สินค้าคุณภาพเยี่ยมจากฟาร์มของเรา สดใหม่ทุกวัน
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group bg-white border-[#e3dcc9] rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(93,110,69,0.1)] hover:shadow-[0_8px_32px_-8px_rgba(93,110,69,0.2)] transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <div className="w-full h-52 bg-[#f5f1e8] flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-[#e8ebe0] to-[#d1d7c3] flex items-center justify-center">
                      <span className="text-[#5d6e45] text-sm font-medium">ภาพสินค้า</span>
                    </div>
                  </div>
                  {product.category && (
                    <Badge 
                      variant="secondary" 
                      className="absolute top-3 left-3 bg-[#faf8f3]/95 text-[#5d6e45] border border-[#e3dcc9]"
                    >
                      {product.category}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-5">
                <h3 className="font-semibold text-lg text-[#3d3b30] mb-2 group-hover:text-[#5d6e45] transition-colors">
                  {product.name_th}
                </h3>
                <p className="text-[#5c5346] text-sm mb-4 line-clamp-2 leading-relaxed">
                  {product.description_th}
                </p>
                <div className="flex items-center gap-1 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#b3bfa0] text-[#b3bfa0]" />
                    ))}
                  </div>
                  <span className="text-sm text-[#6b6b5e]">(5.0)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#5d6e45]">
                    ฿{product.price.toFixed(2)}
                  </span>
                  {product.in_stock ? (
                    <Badge variant="secondary" className="bg-[#e8ebe0] text-[#4a5737]">
                      มีสินค้า
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="bg-[#c4705a]">หมดสต็อก</Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0">
                <div className="flex gap-2 w-full">
                  <Button 
                    className="flex-1 bg-[#5d6e45] hover:bg-[#4a5737] text-white rounded-xl"
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
                      className="w-full border-[#5d6e45] text-[#5d6e45] hover:bg-[#e8ebe0] rounded-xl"
                    >
                      ดูรายละเอียด
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/products">
            <Button 
              variant="outline" 
              size="lg"
              className="border-[#5d6e45] text-[#5d6e45] hover:bg-[#5d6e45] hover:text-white px-8 py-6 rounded-full transition-all duration-300"
            >
              ดูสินค้าทั้งหมด
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
