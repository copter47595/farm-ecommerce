'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { 
  ShoppingBag, 
  DollarSign, 
  Package, 
  AlertTriangle 
} from 'lucide-react'
import { AdminGuard } from '@/contexts/AdminContext'
import AdminLayout from './AdminLayout'
import Link from 'next/link'

interface DashboardStats {
  todayOrders: number
  monthlyRevenue: number
  totalProducts: number
  lowStockProducts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    todayOrders: 0,
    monthlyRevenue: 0,
    totalProducts: 0,
    lowStockProducts: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // Get today's orders
        const today = new Date().toISOString().split('T')[0]
        const { count: todayOrders, error: ordersError } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', today)

        if (ordersError) console.error('Error fetching today orders:', ordersError)

        // Get monthly revenue
        const firstDayOfMonth = new Date()
        firstDayOfMonth.setDate(1)
        firstDayOfMonth.setHours(0, 0, 0, 0)
        
        const { data: monthlyOrders, error: revenueError } = await supabase
          .from('orders')
          .select('total')
          .gte('created_at', firstDayOfMonth.toISOString())

        if (revenueError) console.error('Error fetching monthly revenue:', revenueError)
        
        const monthlyRevenue = monthlyOrders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0

        // Get total products
        const { count: totalProducts, error: productsError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })

        if (productsError) console.error('Error fetching total products:', productsError)

        // Get low stock products (in_stock = false means out of stock)
        const { count: lowStockProducts, error: lowStockError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('in_stock', false)

        if (lowStockError) console.error('Error fetching out of stock products:', lowStockError)

        setStats({
          todayOrders: todayOrders || 0,
          monthlyRevenue,
          totalProducts: totalProducts || 0,
          lowStockProducts: lowStockProducts || 0
        })
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const summaryCards = [
    {
      title: 'ออเดอร์วันนี้',
      value: stats.todayOrders,
      icon: ShoppingBag,
      color: 'bg-[#5d6e45]',
      link: '/admin/orders'
    },
    {
      title: 'ยอดขายรวมเดือนนี้',
      value: `฿${stats.monthlyRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-[#6b7b53]',
      link: '/admin/orders'
    },
    {
      title: 'สินค้าทั้งหมด',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-[#8a9a6b]',
      link: '/admin/products'
    },
    {
      title: 'สินค้าใกล้หมด',
      value: stats.lowStockProducts,
      icon: AlertTriangle,
      color: 'bg-[#c4705a]',
      link: '/admin/products'
    }
  ]

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#3d3b30]">ภาพรวม</h1>
            <p className="text-[#5c5346] mt-1">สถิติและข้อมูลสำคัญของร้านค้า</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryCards.map((card) => {
              const Icon = card.icon
              return (
                <Link key={card.title} href={card.link}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border-[#e3dcc9] bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-[#5c5346]">{card.title}</p>
                          <p className="text-2xl font-bold text-[#3d3b30] mt-2">
                            {loading ? '-' : card.value}
                          </p>
                        </div>
                        <div className={`${card.color} p-3 rounded-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Recent Activity Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-[#e3dcc9] bg-white">
              <CardHeader>
                <h2 className="text-xl font-semibold text-[#3d3b30]">ออเดอร์ล่าสุด</h2>
              </CardHeader>
              <CardContent>
                <p className="text-[#5c5346]">ดูออเดอร์ล่าสุดได้ที่</p>
                <Link href="/admin/orders">
                  <span className="text-[#5d6e45] hover:underline font-medium">
                    หน้าจัดการออเดอร์ →
                  </span>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-[#e3dcc9] bg-white">
              <CardHeader>
                <h2 className="text-xl font-semibold text-[#3d3b30]">สินค้าขายดี</h2>
              </CardHeader>
              <CardContent>
                <p className="text-[#5c5346]">จัดการสินค้าได้ที่</p>
                <Link href="/admin/products">
                  <span className="text-[#5d6e45] hover:underline font-medium">
                    หน้าจัดการสินค้า →
                  </span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  )
}
