
-- Drop the foreign key constraint on user_id to allow sample/demo data
ALTER TABLE public.deal_comments DROP CONSTRAINT IF EXISTS deal_comments_user_id_fkey;
