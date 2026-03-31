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
              <h1 className="text-3xl font-bold text-[#3d3b30]">จัดการสินค้า</h1>
              <p className="text-[#5c5346] mt-1">เพิ่ม แก้ไข และลบสินค้า</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={fetchProducts}
                className="border-[#5d6e45] text-[#5d6e45] hover:bg-[#e8ebe0]"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                รีเฟรช
              </Button>
              <Button
                onClick={openAddModal}
                className="bg-[#5d6e45] hover:bg-[#4a5737] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                เพิ่มสินค้า
              </Button>
            </div>
          </div>

          <Card className="border-[#e3dcc9] bg-white">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-8 text-center text-[#5c5346]">กำลังโหลด...</div>
              ) : products.length === 0 ? (
                <div className="p-8 text-center text-[#5c5346]">ไม่มีสินค้า</div>
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
                            <div className="w-16 h-12 bg-[#e8e0d0] rounded flex items-center justify-center">
                              <span className="text-[#6b7b53] text-xs">รูป</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{product.name_th}</TableCell>
                          <TableCell>฿{product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-[#e8e0d0] text-[#5d6e45]">
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={product.in_stock ? 'default' : 'destructive'} className={product.in_stock ? 'bg-[#5d6e45]' : 'bg-[#c4705a]'}>
                              {product.in_stock ? 'มีสินค้า' : 'หมด'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditModal(product)}
                                className="text-[#5d6e45] hover:text-[#4a5737]"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openDeleteDialog(product)}
                                className="text-[#c4705a] hover:text-[#b35d48]"
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
                  <Label htmlFor="name" className="text-[#5c5346]">ชื่อสินค้า</Label>
                  <Input
                    id="name"
                    value={formData.name_th}
                    onChange={(e) => setFormData(prev => ({ ...prev, name_th: e.target.value }))}
                    placeholder="กรอกชื่อสินค้า"
                    className="border-[#e3dcc9] focus:border-[#5d6e45] focus:ring-[#5d6e45]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-[#5c5346]">ราคา</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.00"
                      className="border-[#e3dcc9] focus:border-[#5d6e45] focus:ring-[#5d6e45]"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="in_stock"
                      checked={formData.in_stock}
                      onChange={(e) => setFormData(prev => ({ ...prev, in_stock: e.target.checked }))}
                      className="h-4 w-4 rounded border-[#e3dcc9] text-[#5d6e45] focus:ring-[#5d6e45]"
                    />
                    <Label htmlFor="in_stock" className="cursor-pointer text-[#5c5346]">มีสินค้าในสต็อก</Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="category" className="text-[#5c5346]">หมวดหมู่</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="border-[#e3dcc9]">
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
                  <Label htmlFor="description" className="text-[#5c5346]">คำอธิบาย</Label>
                  <Textarea
                    id="description"
                    value={formData.description_th}
                    onChange={(e) => setFormData(prev => ({ ...prev, description_th: e.target.value }))}
                    placeholder="กรอกคำอธิบายสินค้า"
                    rows={3}
                    className="border-[#e3dcc9] focus:border-[#5d6e45] focus:ring-[#5d6e45]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image" className="text-[#5c5346]">รูปภาพ</Label>
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
                        className="w-full border-[#e3dcc9] hover:border-[#5d6e45] hover:bg-[#f5f1e8]"
                      >
                        <Upload className="w-4 h-4 mr-2 text-[#5d6e45]" />
                        {formData.image ? formData.image.name : (isEditing ? 'เปลี่ยนรูป (ถ้าต้องการ)' : 'เลือกรูปภาพ')}
                      </Button>
                    </div>
                    {!isEditing && (
                      <p className="text-xs text-[#6b6b5e] mt-1">* จำเป็นสำหรับสินค้าใหม่</p>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="border-[#e3dcc9] hover:bg-[#f5f1e8]"
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || (!isEditing && !formData.image)}
                    className="bg-[#5d6e45] hover:bg-[#4a5737] text-white"
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
                  className="bg-[#c4705a] hover:bg-[#b35d48] text-white"
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
