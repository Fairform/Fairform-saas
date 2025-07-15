
create table if not exists user_documents (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  file_name text not null,
  file_path text,
  document_type text,
  industry text,
  format text check (format in ('docx', 'pdf', 'xlsx')),
  download_url text,
  download_count integer default 0,
  status text default 'uploaded' check (status in ('uploaded', 'queued', 'processing', 'complete', 'failed', 'under_review')),
  file_size bigint,
  metadata jsonb,
  deleted_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists agent_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  agent_id text not null,
  question text,
  response text,
  context jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists document_logs (
  id uuid default uuid_generate_v4() primary key,
  document_id uuid references user_documents(id) on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  action text not null, -- 'upload', 'ingest', 'process', 'complete', 'error'
  status text not null,
  message text,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists template_versions (
  id uuid default uuid_generate_v4() primary key,
  industry text not null,
  document_title text not null,
  content text,
  file_path text,
  uploaded_by text,
  version integer default 1,
  is_active boolean default true,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table user_documents enable row level security;
alter table agent_logs enable row level security;
alter table document_logs enable row level security;
alter table template_versions enable row level security;

create policy "Users can view own documents." on user_documents for select using (auth.uid() = user_id);
create policy "Users can insert own documents." on user_documents for insert with check (auth.uid() = user_id);
create policy "Users can update own documents." on user_documents for update using (auth.uid() = user_id);
create policy "Users can delete own documents." on user_documents for delete using (auth.uid() = user_id);

create policy "Users can view own agent logs." on agent_logs for select using (auth.uid() = user_id);
create policy "Users can insert own agent logs." on agent_logs for insert with check (auth.uid() = user_id);

create policy "Users can view own document logs." on document_logs for select using (auth.uid() = user_id);
create policy "Users can insert own document logs." on document_logs for insert with check (auth.uid() = user_id);

create policy "Anyone can view active templates." on template_versions for select using (is_active = true);

-- Create updated_at triggers
create trigger handle_updated_at before update on user_documents
  for each row execute procedure handle_updated_at();

create trigger handle_updated_at before update on template_versions
  for each row execute procedure handle_updated_at();

-- Create indexes for better performance
create index user_documents_user_id_idx on user_documents(user_id);
create index user_documents_created_at_idx on user_documents(created_at);
create index user_documents_status_idx on user_documents(status);
create index user_documents_document_type_idx on user_documents(document_type);

create index agent_logs_user_id_idx on agent_logs(user_id);
create index agent_logs_agent_id_idx on agent_logs(agent_id);
create index agent_logs_created_at_idx on agent_logs(created_at);

create index document_logs_document_id_idx on document_logs(document_id);
create index document_logs_user_id_idx on document_logs(user_id);
create index document_logs_created_at_idx on document_logs(created_at);

create index template_versions_industry_idx on template_versions(industry);
create index template_versions_is_active_idx on template_versions(is_active);
