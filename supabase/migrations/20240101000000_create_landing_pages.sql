-- Create landing_pages table
CREATE TABLE IF NOT EXISTS landing_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content JSONB NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX idx_landing_pages_user_id ON landing_pages(user_id);
CREATE INDEX idx_landing_pages_slug ON landing_pages(slug);
CREATE INDEX idx_landing_pages_published ON landing_pages(published);

-- Enable RLS
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own landing pages" ON landing_pages
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own landing pages" ON landing_pages
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own landing pages" ON landing_pages
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own landing pages" ON landing_pages
  FOR DELETE
  USING (auth.uid() = user_id);

-- Public users can view published landing pages
CREATE POLICY "Anyone can view published landing pages" ON landing_pages
  FOR SELECT
  USING (published = true);