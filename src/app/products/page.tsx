'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ShoppingCart, Plus } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Product {
  id: string
  name_th: string
  description_th: string
  price: number
  image_url: string
  category: string
  in_stock: boolean
}

const categories = [
  { id: 'all', name: 'ทั้งหมด' },
  { id: 'เมล่อน', name: 'เมล่อน' },
  { id: 'ผักสด', name: 'ผักสด' },
  { id: 'ของแปรรูป', name: 'ของแปรรูป' },
  { id: 'เครื่องดื่ม', name: 'เครื่องดื่ม' },
  { id: 'ผลิตภัณฑ์ทำความสะอาด', name: 'ผลิตภัณฑ์ทำความสะอาด' }
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('🚀 Starting to fetch all products...')
        console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
        
        // Test connection first
        const connectionTest = await supabase.from('products').select('count').limit(1)
        console.log('📊 Connection test result:', connectionTest)
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('in_stock', true)
          .order('created_at', { ascending: false })

        console.log('📦 Raw response:', JSON.stringify({data, error}))

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
          const sampleData: Product[] = [
            {
              id: '00000000-0000-0000-0000-000000000001',
              name_th: 'เมล่อนฮันนี่สวีท',
              description_th: 'เมล่อนหวานกรอบจากฟาร์มของเรา',
              price: 120.00,
              image_url: '/api/placeholder/400/300',
              category: 'เมล่อน',
              in_stock: true
            },
            {
              id: '00000000-0000-0000-0000-000000000002',
              name_th: 'ผักกาดสดจากฟาร์ม',
              description_th: 'ผักกาดสดปลอดสารพิษจากฟาร์มของเรา สะอาดปลอดภัย',
              price: 25.00,
              image_url: '/api/placeholder/400/300',
              category: 'ผักสด',
              in_stock: true
            },
            {
              id: '00000000-0000-0000-0000-000000000003',
              name_th: 'น้ำผึ้งแท้',
              description_th: 'น้ำผึ้งแท้จากฟาร์มของเรา คุณภาพเยี่ยม',
              price: 150.00,
              image_url: '/api/placeholder/400/300',
              category: 'ของแปรรูป',
              in_stock: true
            },
            {
              id: '00000000-0000-0000-0000-000000000004',
              name_th: 'น้ำอ้อยสด',
              description_th: 'น้ำอ้อยสดใหม่จากอ้อยคุณภาพดี',
              price: 30.00,
              image_url: '/api/placeholder/400/300',
              category: 'เครื่องดื่ม',
              in_stock: true
            },
            {
              id: '00000000-0000-0000-0000-000000000005',
              name_th: 'สบู่ผักตบชวา',
              description_th: 'สบู่ธรรมชาติจากผักตบชวา อ่อนโยนต่อผิวหนัง',
              price: 45.00,
              image_url: '/api/placeholder/400/300',
              category: 'ผลิตภัณฑ์ทำความสะอาด',
              in_stock: true
            }
          ]
          setProducts(sampleData)
          setFilteredProducts(sampleData)
        } else {
          console.log('✅ Successfully fetched products:', data?.length || 0, 'items')
          console.log('📋 Product data:', data)
          setProducts(data || [])
          setFilteredProducts(data || [])
        }
      } catch (error) {
        console.error('💥 Unexpected error in fetchProducts:', error)
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack available')
      } finally {
        console.log('🏁 Fetch operation completed')
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory))
    }
  }, [selectedCategory, products])

  const addToCart = (product: Product) => {
    addItem({
      id: product.id,
      name_th: product.name_th,
      price: product.price,
      image_url: product.image_url,
      category: product.category
    })
  }

  const ProductSkeleton = () => (
    <Card className="border-gray-200">
      <CardContent className="p-0">
        <Skeleton className="w-full h-48 rounded-t-lg" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-full" />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-[#fdf6ec]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#3d3b30] mb-4">สินค้าทั้งหมด</h1>
          <p className="text-[#5c5346] text-lg">เลือกซื้อสินค้าคุณภาพจากฟาร์มของเรา</p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-md ${
                  selectedCategory === category.id
                    ? 'bg-[#5d6e45] hover:bg-[#4a5737] text-white'
                    : 'border-[#5d6e45] text-[#5d6e45] hover:bg-[#e8ebe0]'
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ไม่พบสินค้า</h3>
            <p className="text-gray-600">ไม่มีสินค้าในหมวดหมู่นี้ในขณะนี้</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 border-gray-200">
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="w-full aspect-[4/3] bg-[#e8e0d0] flex items-center justify-center">
                      <span className="text-[#5d6e45] font-medium">ภาพสินค้า</span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="absolute top-2 left-2 bg-[#faf8f3]/90 text-[#5d6e45]"
                    >
                      {product.category}
                    </Badge>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-[#3d3b30] mb-2 group-hover:text-[#5d6e45] transition-colors line-clamp-1">
                      {product.name_th}
                    </h3>
                    <p className="text-[#5c5346] text-sm mb-3 line-clamp-2">
                      {product.description_th}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-[#5d6e45]">
                        ฿{product.price.toFixed(2)}
                      </span>
                      <Badge variant="secondary" className="bg-[#e8ebe0] text-[#4a5737] text-xs">
                        มีสินค้า
                      </Badge>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <div className="flex gap-2 w-full">
                    <Button 
                      className="flex-1 bg-[#5d6e45] hover:bg-[#4a5737] text-white"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      หยิบใส่ตะกร้า
                    </Button>
                    <Link href={`/products/${product.id}`} className="flex-1">
                      <Button 
                        variant="outline" 
                        className="w-full border-[#5d6e45] text-[#5d6e45] hover:bg-[#e8ebe0]"
                      >
                        ดูรายละเอียด
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
