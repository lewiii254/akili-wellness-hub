

-- This file represents the structure needed for the database
-- You need to run these SQL commands in your Supabase SQL editor

-- Create community_discussions table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.community_discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT,
  author_avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  tags TEXT[], -- Store tags as an array
  is_approved BOOLEAN DEFAULT false,
  is_hidden BOOLEAN DEFAULT false,
  like_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0
);

-- Create content_flags table if it doesn't exist  
CREATE TABLE IF NOT EXISTS public.content_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL, -- 'discussion', 'journal', 'comment', etc.
  content_id TEXT NOT NULL, -- ID of the content being flagged
  reporter_id UUID REFERENCES auth.users(id),
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'resolved', 'dismissed', 'content_removed'
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_by UUID REFERENCES auth.users(id),
  resolution_notes TEXT
);

-- Create mood_journal_entries table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.mood_journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  content TEXT NOT NULL,
  mood_score INTEGER,
  ai_suggestion TEXT,
  is_hidden BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add email field to profiles table if it doesn't exist
ALTER TABLE IF EXISTS public.profiles 
ADD COLUMN IF NOT EXISTS email TEXT;

-- Add RLS policies for community_discussions
ALTER TABLE public.community_discussions ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved discussions
CREATE POLICY IF NOT EXISTS "Anyone can read approved discussions" 
  ON public.community_discussions 
  FOR SELECT 
  USING (is_approved = true AND is_hidden = false);

-- Authors can read their own discussions even if not approved
CREATE POLICY IF NOT EXISTS "Authors can read own discussions" 
  ON public.community_discussions 
  FOR SELECT 
  USING (auth.uid() = author_id);

-- Authenticated users can insert discussions
CREATE POLICY IF NOT EXISTS "Authenticated users can create discussions" 
  ON public.community_discussions 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- Authors can update their own discussions
CREATE POLICY IF NOT EXISTS "Authors can update own discussions" 
  ON public.community_discussions 
  FOR UPDATE 
  USING (auth.uid() = author_id);

-- Authors can delete their own discussions
CREATE POLICY IF NOT EXISTS "Authors can delete own discussions" 
  ON public.community_discussions 
  FOR DELETE 
  USING (auth.uid() = author_id);

-- Add RLS policies for content_flags
ALTER TABLE public.content_flags ENABLE ROW LEVEL SECURITY;

-- Admins can read all flags
CREATE POLICY IF NOT EXISTS "Admins can read all flags" 
  ON public.content_flags 
  FOR SELECT 
  USING (public.is_admin(auth.uid()) OR public.is_moderator_or_admin(auth.uid()));

-- Reporters can read their own flags
CREATE POLICY IF NOT EXISTS "Reporters can read own flags" 
  ON public.content_flags 
  FOR SELECT 
  USING (auth.uid() = reporter_id);

-- Authenticated users can insert flags
CREATE POLICY IF NOT EXISTS "Authenticated users can create flags" 
  ON public.content_flags 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- Admins can update flags
CREATE POLICY IF NOT EXISTS "Admins can update flags" 
  ON public.content_flags 
  FOR UPDATE 
  USING (public.is_admin(auth.uid()) OR public.is_moderator_or_admin(auth.uid()));

-- Admins can delete flags
CREATE POLICY IF NOT EXISTS "Admins can delete flags" 
  ON public.content_flags 
  FOR DELETE 
  USING (public.is_admin(auth.uid()));

-- Add RLS policies for mood_journal_entries if they don't exist
ALTER TABLE IF EXISTS public.mood_journal_entries ENABLE ROW LEVEL SECURITY;

-- Users can see their own journal entries
CREATE POLICY IF NOT EXISTS "Users can see own journal entries" 
  ON public.mood_journal_entries 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can insert their own journal entries
CREATE POLICY IF NOT EXISTS "Users can insert own journal entries" 
  ON public.mood_journal_entries 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own journal entries
CREATE POLICY IF NOT EXISTS "Users can update own journal entries" 
  ON public.mood_journal_entries 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Users can delete their own journal entries
CREATE POLICY IF NOT EXISTS "Users can delete own journal entries" 
  ON public.mood_journal_entries 
  FOR DELETE 
  USING (auth.uid() = user_id);

