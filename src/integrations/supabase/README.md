
# Database Setup Instructions

To enable the community posting and content moderation functionality, you need to set up some database tables and policies in your Supabase project.

## Required Setup

1. Open your Supabase SQL Editor
2. Copy and run the SQL commands from the `schema.sql` file in this directory

## Tables Created

### community_discussions
Stores community posts and discussions with fields for:
- Title
- Content
- Author information
- Tags
- Approval status
- Like and reply counts

### content_flags
Stores reports about content that needs moderation:
- Type of content (discussion, journal, etc.)
- Content ID
- Reporter information
- Reason for flagging
- Status (pending, resolved, etc.)
- Resolution notes

## Row Level Security Policies

The SQL setup includes Row Level Security (RLS) policies to ensure:
- Only approved discussions are publicly visible
- Users can see their own posts even if not approved
- Only admins can see and process all flags
- Users can report content and see their own reports

## Admin Functions

Make sure you have the following database functions set up for admin functionality:

```sql
-- Check if a user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role user_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT public.has_role(_user_id, 'admin');
$$;

-- Check if a user is a moderator or admin
CREATE OR REPLACE FUNCTION public.is_moderator_or_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT public.has_role(_user_id, 'admin') OR public.has_role(_user_id, 'moderator');
$$;
```

## Adding Admins

You can grant admin privileges to users through the AdminMaker component in the Mental Health Dashboard or by directly inserting records into the `user_roles` table:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_ID_HERE', 'admin');
```
