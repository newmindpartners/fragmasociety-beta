-- Create storage bucket for deal images
INSERT INTO storage.buckets (id, name, public)
VALUES ('deal-images', 'deal-images', true);

-- Allow public read access to deal images
CREATE POLICY "Deal images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'deal-images');

-- Allow authenticated users to upload/manage deal images
CREATE POLICY "Authenticated users can upload deal images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'deal-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update deal images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'deal-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete deal images"
ON storage.objects FOR DELETE
USING (bucket_id = 'deal-images' AND auth.uid() IS NOT NULL);

-- Add banner_image column to deals table
ALTER TABLE public.deals ADD COLUMN IF NOT EXISTS banner_image TEXT;