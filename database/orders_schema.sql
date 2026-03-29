-- Create orders table for cart checkout
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  items JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  slip_url TEXT,
  status TEXT DEFAULT 'รอตรวจสอบ' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on status for faster queries
CREATE INDEX idx_orders_status ON orders(status);

-- Create index on created_at for sorting
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (for checkout)
CREATE POLICY "Allow public to create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Create policy for public to view their own orders (optional, for order tracking)
-- You may want to add authentication later for this
CREATE POLICY "Allow public to view orders" ON orders
  FOR SELECT USING (true);

-- Storage bucket setup for slips
-- Run this in Supabase dashboard SQL editor or use Supabase CLI:
-- 1. Create a bucket named 'slips' (public)
-- 2. Set up storage policies:

-- Storage policy to allow public uploads to slips bucket
-- Note: Storage policies need to be set in Supabase Dashboard or via API

-- Instructions for Supabase Dashboard:
-- 1. Go to Storage → New bucket → Name: 'slips' → Public: true
-- 2. Go to Storage → slips → Policies → New policy
-- 3. Policy name: "Allow public uploads"
-- 4. Allowed operation: INSERT
-- 5. Target roles: anon, authenticated
-- 6. Policy definition: true
-- 7. Save policy

-- 8. Another policy for SELECT (to view slips):
-- Policy name: "Allow public to view slips"
-- Allowed operation: SELECT
-- Target roles: anon, authenticated
-- Policy definition: true

-- Sample order data (for testing, optional)
-- INSERT INTO orders (name, phone, address, items, total, status) VALUES
-- ('สมชาย ใจดี', '0891234567', '123 หมู่ 4 ต.ทุ่งสองห้อง อ.เมือง จ.ขอนแก่น', 
--  '[{"id":"1","name_th":"ผักกาด","price":25,"quantity":2}]'::jsonb, 
--  50.00, 'รอตรวจสอบ');
