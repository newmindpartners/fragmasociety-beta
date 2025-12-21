-- Create deal_comments table for discussions
CREATE TABLE public.deal_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES public.deal_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create deal_updates table for project updates
CREATE TABLE public.deal_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.deal_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_updates ENABLE ROW LEVEL SECURITY;

-- RLS policies for deal_comments
CREATE POLICY "Comments are publicly readable"
ON public.deal_comments
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create comments"
ON public.deal_comments
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
ON public.deal_comments
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
ON public.deal_comments
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- RLS policies for deal_updates (public read, admin write would need role system)
CREATE POLICY "Updates are publicly readable"
ON public.deal_updates
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can manage updates"
ON public.deal_updates
FOR ALL
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Create indexes for performance
CREATE INDEX idx_deal_comments_deal_id ON public.deal_comments(deal_id);
CREATE INDEX idx_deal_comments_parent_id ON public.deal_comments(parent_id);
CREATE INDEX idx_deal_updates_deal_id ON public.deal_updates(deal_id);

-- Enable realtime for comments
ALTER PUBLICATION supabase_realtime ADD TABLE public.deal_comments;