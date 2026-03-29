'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Send, CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
  }

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-700" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            ส่งข้อความสำเร็จ
          </h3>
          <p className="text-gray-600 mb-4">
            ขอบคุณที่ติดต่อเรา ทีมงานจะตอบกลับโดยเร็วที่สุด
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="border-green-700 text-green-700 hover:bg-green-50"
          >
            ส่งข้อความใหม่
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-gray-700">
          ชื่อ <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="กรอกชื่อของคุณ"
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="email" className="text-gray-700">
          อีเมล <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="example@email.com"
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="message" className="text-gray-700">
          ข้อความ <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="เขียนข้อความของคุณที่นี่..."
          rows={5}
          required
          className="mt-1"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-700 hover:bg-green-800 text-white py-3"
      >
        {isSubmitting ? (
          'กำลังส่ง...'
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            ส่งข้อความ
          </>
        )}
      </Button>
    </form>
  )
}
