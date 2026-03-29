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
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabase'
import { AdminGuard } from '@/contexts/AdminContext'
import AdminLayout from '../AdminLayout'
import { Plus, Pencil, Trash2, RefreshCw, Upload } from 'lucide-react'

interface Product {
  id: string
  name_th: string
  description_th: string
  price: number
  image_url: string
  category: string
  in_stock: boolean
  created_at: string
}

const categories = [
  'เมล่อน',
  'ผักสด',
  'ของแปรรูป',
  'เครื่องดื่ม',
  'ผลิตภัณฑ์ทำความสะอาด'
]

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    name_th: '',
    price: '',
    category: '',
    description_th: '',
    in_stock: true,
    image: null as File | null
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching products:', error)
        return
      }

      setProducts(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setFormData({
      name_th: '',
      price: '',
      category: '',
      description_th: '',
      in_stock: true,
      image: null
    })
    setSelectedProduct(null)
    setIsEditing(false)
  }

  function openAddModal() {
    resetForm()
    setIsModalOpen(true)
  }

  function openEditModal(product: Product) {
    setSelectedProduct(product)
    setFormData({
      name_th: product.name_th,
      price: product.price.toString(),
      category: product.category,
      description_th: product.description_th,
      in_stock: product.in_stock,
      image: null
    })
    setIsEditing(true)
    setIsModalOpen(true)
  }

  function openDeleteDialog(product: Product) {
    setSelectedProduct(product)
    setIsDeleteDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let imageUrl = ''

      // Upload image if provided
      if (formData.image) {
        const fileName = `products/${Date.now()}_${formData.image.name}`
        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(fileName, formData.image)

        if (uploadError) {
          console.error('Error uploading image:', uploadError)
          throw new Error('Failed to upload image')
        }

        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(fileName)
        
        imageUrl = publicUrl
      }

      const productData = {
        name_th: formData.name_th,
        price: parseFloat(formData.price),
        category: formData.category,
        description_th: formData.description_th,
        in_stock: formData.in_stock,
        ...(imageUrl && { image_url: imageUrl })
      }

      if (isEditing && selectedProduct) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', selectedProduct.id)

        if (error) throw error
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert([{
            ...productData,
            image_url: imageUrl || '/api/placeholder/300/200'
          }])

        if (error) throw error
      }

      setIsModalOpen(false)
      resetForm()
      fetchProducts()
    } catch (error) {
      console.error('Error saving product:', error)
      alert('เกิดข้อผิดพลาดในการบันทึกสินค้า')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!selectedProduct) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', selectedProduct.id)

      if (error) throw error

      setIsDeleteDialogOpen(false)
      setSelectedProduct(null)
      fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('เกิดข้อผิดพลาดในการลบสินค้า')
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
    }
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">จัดการสินค้า</h1>
              <p className="text-gray-600 mt-1">เพิ่ม แก้ไข และลบสินค้า</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={fetchProducts}
                className="border-green-700 text-green-700 hover:bg-green-50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                รีเฟรช
              </Button>
              <Button
                onClick={openAddModal}
                className="bg-green-700 hover:bg-green-800 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                เพิ่มสินค้า
              </Button>
            </div>
          </div>

          <Card className="border-gray-200">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-8 text-center text-gray-600">กำลังโหลด...</div>
              ) : products.length === 0 ? (
                <div className="p-8 text-center text-gray-600">ไม่มีสินค้า</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>รูป</TableHead>
                        <TableHead>ชื่อ</TableHead>
                        <TableHead>ราคา</TableHead>
                        <TableHead>หมวดหมู่</TableHead>
                        <TableHead>สต็อก</TableHead>
                        <TableHead className="text-right">จัดการ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="w-16 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded flex items-center justify-center">
                              <span className="text-green-700 text-xs">รูป</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{product.name_th}</TableCell>
                          <TableCell>฿{product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={product.in_stock ? 'default' : 'destructive'}>
                              {product.in_stock ? 'มีสินค้า' : 'หมด'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditModal(product)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openDeleteDialog(product)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add/Edit Modal */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">ชื่อสินค้า</Label>
                  <Input
                    id="name"
                    value={formData.name_th}
                    onChange={(e) => setFormData(prev => ({ ...prev, name_th: e.target.value }))}
                    placeholder="กรอกชื่อสินค้า"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">ราคา</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="in_stock"
                      checked={formData.in_stock}
                      onChange={(e) => setFormData(prev => ({ ...prev, in_stock: e.target.checked }))}
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <Label htmlFor="in_stock" className="cursor-pointer">มีสินค้าในสต็อก</Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">หมวดหมู่</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      {formData.category || 'เลือกหมวดหมู่'}
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">คำอธิบาย</Label>
                  <Textarea
                    id="description"
                    value={formData.description_th}
                    onChange={(e) => setFormData(prev => ({ ...prev, description_th: e.target.value }))}
                    placeholder="กรอกคำอธิบายสินค้า"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image">รูปภาพ</Label>
                  <div className="mt-1">
                    <div className="flex items-center gap-2">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image')?.click()}
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {formData.image ? formData.image.name : (isEditing ? 'เปลี่ยนรูป (ถ้าต้องการ)' : 'เลือกรูปภาพ')}
                      </Button>
                    </div>
                    {!isEditing && (
                      <p className="text-xs text-gray-500 mt-1">* จำเป็นสำหรับสินค้าใหม่</p>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || (!isEditing && !formData.image)}
                    className="bg-green-700 hover:bg-green-800 text-white"
                  >
                    {isSubmitting ? 'กำลังบันทึก...' : 'บันทึก'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>ยืนยันการลบ</DialogTitle>
                <DialogDescription>
                  คุณต้องการลบสินค้า &quot;{selectedProduct?.name_th}&quot; ใช่หรือไม่?
                  การกระทำนี้ไม่สามารถย้อนกลับได้
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  ยกเลิก
                </Button>
                <Button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  ลบสินค้า
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </AdminGuard>
  )
}
