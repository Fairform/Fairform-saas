-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  company text,
  avatar_url text,
  billing_address jsonb,
  payment_method jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create products table (synced from Stripe)
create table products (
  id text primary key,
  active boolean,
  name text,
  description text,
  image text,
  metadata jsonb
);

-- Create prices table (synced from Stripe)
create table prices (
  id text primary key,
  product_id text references products(id),
  active boolean,
  description text,
  unit_amount bigint,
  currency text check (char_length(currency) = 3),
  type text check (type in ('one_time', 'recurring')),
  interval text check (interval in ('month', 'year')),
  interval_count integer,
  trial_period_days integer,
  metadata jsonb
);

-- Create customers table (synced from Stripe)
create table customers (
  id uuid references auth.users on delete cascade not null primary key,
  stripe_customer_id text unique
);

-- Create subscriptions table (synced from Stripe)
create table subscriptions (
  id text primary key,
  user_id uuid references auth.users on delete cascade not null,
  status text,
  metadata jsonb,
  price_id text references prices(id),
  quantity integer,
  cancel_at_period_end boolean,
  created timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_start timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_end timestamp with time zone default timezone('utc'::text, now()) not null,
  ended_at timestamp with time zone,
  cancel_at timestamp with time zone,
  canceled_at timestamp with time zone,
  trial_start timestamp with time zone,
  trial_end timestamp with time zone
);

-- Create usage table for tracking user activity
create table usage (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  action text not null,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create generated_documents table
create table generated_documents (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  content text,
  document_type text,
  industry text,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table customers enable row level security;
alter table subscriptions enable row level security;
alter table usage enable row level security;
alter table generated_documents enable row level security;

-- Create policies
create policy "Users can view own profile." on profiles for select using (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

create policy "Users can view own customer data." on customers for select using (auth.uid() = id);

create policy "Users can view own subscriptions." on subscriptions for select using (auth.uid() = user_id);

create policy "Users can view own usage." on usage for select using (auth.uid() = user_id);
create policy "Users can insert own usage." on usage for insert with check (auth.uid() = user_id);

create policy "Users can view own documents." on generated_documents for select using (auth.uid() = user_id);
create policy "Users can insert own documents." on generated_documents for insert with check (auth.uid() = user_id);
create policy "Users can update own documents." on generated_documents for update using (auth.uid() = user_id);
create policy "Users can delete own documents." on generated_documents for delete using (auth.uid() = user_id);

-- Allow public read access to products and prices
create policy "Allow public read access to products." on products for select using (true);
create policy "Allow public read access to prices." on prices for select using (true);

-- Create functions
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Create updated_at trigger function
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create updated_at triggers
create trigger handle_updated_at before update on profiles
  for each row execute procedure handle_updated_at();

create trigger handle_updated_at before update on generated_documents
  for each row execute procedure handle_updated_at();

-- Create indexes for better performance
create index profiles_email_idx on profiles(email);
create index subscriptions_user_id_idx on subscriptions(user_id);
create index subscriptions_status_idx on subscriptions(status);
create index usage_user_id_idx on usage(user_id);
create index usage_created_at_idx on usage(created_at);
create index generated_documents_user_id_idx on generated_documents(user_id);
create index generated_documents_created_at_idx on generated_documents(created_at);