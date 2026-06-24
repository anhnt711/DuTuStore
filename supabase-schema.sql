-- Supabase Schema cho Du Tú Số To
-- Chạy trong Supabase SQL Editor

-- Products table
create table public.products (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  slug text not null unique,
  line text not null,
  description text,
  price bigint not null,
  original_price bigint,
  images jsonb not null default '[]'::jsonb,
  colors jsonb not null default '[]'::jsonb,
  storages jsonb not null default '[]'::jsonb,
  specs jsonb not null default '{}'::jsonb,
  in_stock boolean default true,
  featured boolean default false,
  deal boolean default false,
  rating numeric(3,1) default 5.0,
  review_count integer default 0
);

-- Orders table
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  code text not null unique,
  customer_name text not null,
  customer_email text,
  customer_phone text not null,
  customer_address text not null,
  payment_method text default 'cod',
  status text default 'pending' check (status in ('pending','confirmed','shipping','delivered','cancelled')),
  total bigint not null,
  note text
);

-- Order items table
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  color text,
  storage text,
  quantity integer not null,
  price bigint not null
);

-- Enable Row Level Security
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Products: anyone can read, only authenticated can write
create policy "Products are viewable by everyone" on public.products for select using (true);
create policy "Products can be managed by authenticated" on public.products for all using (auth.role() = 'authenticated');

-- Orders: users can create, only authenticated can view all
create policy "Anyone can create orders" on public.orders for insert with check (true);
create policy "Orders viewable by authenticated" on public.orders for select using (auth.role() = 'authenticated');
create policy "Orders updatable by authenticated" on public.orders for update using (auth.role() = 'authenticated');

-- Order items
create policy "Anyone can create order items" on public.order_items for insert with check (true);
create policy "Order items viewable by authenticated" on public.order_items for select using (auth.role() = 'authenticated');

-- Sample data (iPhone 15 Pro Max)
insert into public.products (name, slug, line, description, price, original_price, images, colors, storages, specs, in_stock, featured, deal, rating, review_count) values (
  'iPhone 15 Pro Max',
  'iphone-15-pro-max',
  'iPhone 15 Series',
  'iPhone 15 Pro Max với khung Titanium cao cấp, chip A17 Pro mạnh mẽ, camera 48MP chuyên nghiệp.',
  34990000,
  39990000,
  '["https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=800&hei=800&fmt=png-alpha"]',
  '[{"name":"Titanium Tự Nhiên","hex":"#b5a99a","image":"https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=800&hei=800&fmt=png-alpha"},{"name":"Titanium Đen","hex":"#4a4a4a","image":"https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-blacktitanium?wid=800&hei=800&fmt=png-alpha"}]',
  '[{"label":"256GB","price":34990000},{"label":"512GB","price":39990000},{"label":"1TB","price":44990000}]',
  '{"Màn hình":"Super Retina XDR 6.7\"","Chip":"A17 Pro","Camera sau":"48MP + 12MP + 12MP","Pin":"4422 mAh","HĐH":"iOS 17"}',
  true, true, true, 4.9, 1284
);
