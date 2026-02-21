-- Create bookings table for equipment rental
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  equipment_name text not null,
  equipment_type text not null,
  rental_start_date date not null,
  rental_end_date date not null,
  total_cost numeric(10, 2) not null,
  booking_status text not null default 'confirmed',
  payment_status text not null default 'pending',
  renter_name text not null,
  renter_phone text not null,
  renter_location text not null,
  owner_name text not null,
  owner_phone text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint valid_booking_status check (booking_status in ('confirmed', 'delivered', 'completed', 'cancelled')),
  constraint valid_payment_status check (payment_status in ('pending', 'paid'))
);

-- Enable RLS
alter table public.bookings enable row level security;

-- Allow everyone to insert bookings (renters)
create policy "bookings_insert_public" on public.bookings for insert with check (true);

-- Allow everyone to view all bookings (for demo purposes - in production, restrict this)
create policy "bookings_select_public" on public.bookings for select using (true);

-- Allow everyone to update bookings (for demo purposes - in production, restrict to owners)
create policy "bookings_update_public" on public.bookings for update using (true);

-- Create index for faster queries
create index if not exists bookings_payment_status_idx on public.bookings(payment_status);
create index if not exists bookings_booking_status_idx on public.bookings(booking_status);
create index if not exists bookings_created_at_idx on public.bookings(created_at desc);
