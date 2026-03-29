-- Fix RLS issues by disabling row level security and adding permissive policies

-- Disable RLS for products table
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Disable RLS for orders table  
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- Create permissive policies for products
CREATE POLICY "allow all" ON products FOR ALL USING (true);
CREATE POLICY "allow all" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "allow all" ON products FOR UPDATE WITH CHECK (true);
CREATE POLICY "allow all" ON products FOR DELETE USING (true);

-- Create permissive policies for orders
CREATE POLICY "allow all" ON orders FOR ALL USING (true);
CREATE POLICY "allow all" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "allow all" ON orders FOR UPDATE WITH CHECK (true);
CREATE POLICY "allow all" ON orders FOR DELETE USING (true);

-- Enable RLS with permissive policies (alternative approach)
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Note: If you prefer to keep RLS enabled, comment out the DISABLE lines
-- and uncomment the ENABLE lines above. The permissive policies will allow all operations.
