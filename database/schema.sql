-- Create products table for ฟาร์มพึ่งหนุ่ม e-commerce
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_th TEXT NOT NULL,
  description_th TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_in_stock ON products(in_stock) WHERE in_stock = true;

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Create policy for insert/update/delete (you can restrict this as needed)
CREATE POLICY "Only authenticated users can modify products" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- Sample data (optional - you can remove this in production)
INSERT INTO products (name_th, description_th, price, image_url, category, featured) VALUES
('ผักกาดสดจากฟาร์ม', 'ผักกาดสดปลอดสารพิษจากฟาร์มของเรา สะอาดปลอดภัย', 25.00, '/api/placeholder/300/200', 'vegetables', true),
('มะเขือเทศออร์แกนิค', 'มะเขือเทศสุกสีแดง หวานอร่อยจากธรรมชาติ', 40.00, '/api/placeholder/300/200', 'vegetables', true),
('ไข่ไก่ฟาร์ม', 'ไข่ไก่สดใหม่จากไก่ที่เลี้ยงในฟาร์ม', 120.00, '/api/placeholder/300/200', 'eggs', true),
('ข้าวหอมมะลิ', 'ข้าวหอมมะลิคุณภาพเยี่ยมจากฟาร์ม', 150.00, '/api/placeholder/300/200', 'grains', false);
