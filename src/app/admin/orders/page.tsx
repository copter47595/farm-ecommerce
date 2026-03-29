'use client'

import { useEffect, useState } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import { AdminGuard } from '@/contexts/AdminContext'
import AdminLayout from '../AdminLayout'
import { Eye, RefreshCw } from 'lucide-react'

interface Order {
  id: string
  name: string
  phone: string
  address: string
  items: CartItem[]
  total: number
  slip_url: string
  status: string
  created_at: string
}

interface CartItem {
  id: string
  name_th: string
  price: number
  quantity: number
}

const statusOptions = [
  { value: 'รอตรวจสอบ', label: 'รอตรวจสอบ', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'ยืนยันแล้ว', label: 'ยืนยันแล้ว', color: 'bg-blue-100 text-blue-800' },
  { value: 'จัดส่งแล้ว', label: 'จัดส่งแล้ว', color: 'bg-purple-100 text-purple-800' },
  { value: 'เสร็จสิ้น', label: 'เสร็จสิ้น', color: 'bg-green-100 text-green-800' },
]

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isSlipModalOpen, setIsSlipModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error)
        return
      }

      // Parse items JSON
      const parsedOrders = data?.map(order => ({
        ...order,
        items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items
      })) || []

      setOrders(parsedOrders)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(orderId: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) {
        console.error('Error updating status:', error)
        return
      }

      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  function viewSlip(order: Order) {
    setSelectedOrder(order)
    setIsSlipModalOpen(true)
  }

  function viewDetails(order: Order) {
    setSelectedOrder(order)
    setIsDetailModalOpen(true)
  }

  function getStatusColor(status: string) {
    const option = statusOptions.find(opt => opt.value === status)
    return option?.color || 'bg-gray-100 text-gray-800'
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">จัดการออเดอร์</h1>
              <p className="text-gray-600 mt-1">ดูและจัดการคำสั่งซื้อทั้งหมด</p>
            </div>
            <Button
              variant="outline"
              onClick={fetchOrders}
              className="border-green-700 text-green-700 hover:bg-green-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              รีเฟรช
            </Button>
          </div>

          <Card className="border-gray-200">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-8 text-center text-gray-600">กำลังโหลด...</div>
              ) : orders.length === 0 ? (
                <div className="p-8 text-center text-gray-600">ไม่มีออเดอร์</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>วันที่</TableHead>
                        <TableHead>ชื่อลูกค้า</TableHead>
                        <TableHead>เบอร์โทร</TableHead>
                        <TableHead>ยอดรวม</TableHead>
                        <TableHead>สถานะ</TableHead>
                        <TableHead>สลิป</TableHead>
                        <TableHead>รายละเอียด</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="whitespace-nowrap">
                            {formatDate(order.created_at)}
                          </TableCell>
                          <TableCell>{order.name}</TableCell>
                          <TableCell>{order.phone}</TableCell>
                          <TableCell className="font-medium">
                            ฿{order.total.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={order.status}
                              onValueChange={(value) => updateStatus(order.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status}
                                </Badge>
                              </SelectTrigger>
                              <SelectContent>
                                {statusOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            {order.slip_url ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => viewSlip(order)}
                                className="text-green-700 hover:text-green-800"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                ดูสลิป
                              </Button>
                            ) : (
                              <span className="text-gray-400 text-sm">ไม่มีสลิป</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewDetails(order)}
                            >
                              ดูรายละเอียด
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Slip Modal */}
          <Dialog open={isSlipModalOpen} onOpenChange={setIsSlipModalOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>สลิปการโอนเงิน</DialogTitle>
              </DialogHeader>
              {selectedOrder?.slip_url && (
                <div className="flex justify-center">
                  <img 
                    src={selectedOrder.slip_url} 
                    alt="สลิปการโอนเงิน"
                    className="max-h-96 rounded-lg"
                  />
                </div>
              )}
              <div className="text-center text-sm text-gray-600">
                <p>ออเดอร์ #{selectedOrder?.id.slice(-8)}</p>
                <p>ยอด: ฿{selectedOrder?.total.toFixed(2)}</p>
              </div>
            </DialogContent>
          </Dialog>

          {/* Detail Modal */}
          <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>รายละเอียดออเดอร์</DialogTitle>
              </DialogHeader>
              {selectedOrder && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">ชื่อลูกค้า</p>
                      <p className="font-medium">{selectedOrder.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">เบอร์โทร</p>
                      <p className="font-medium">{selectedOrder.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 text-sm">ที่อยู่จัดส่ง</p>
                    <p className="font-medium">{selectedOrder.address}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm mb-2">รายการสินค้า</p>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name_th} x{item.quantity}</span>
                          <span>฿{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between font-medium">
                          <span>ยอดรวม</span>
                          <span>฿{selectedOrder.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </AdminGuard>
  )
}
