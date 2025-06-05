-- Ensure the public schema exists (it usually does)
CREATE SCHEMA IF NOT EXISTS public;

-- Set search_path for the session to ensure objects are created in 'public'
-- SET search_path TO public; -- Uncomment if you face schema issues

-- Create the waitlist table if it doesn't already exist
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT,
    phone_number TEXT,
    country_code TEXT,
    country_name TEXT,
    interest TEXT CHECK (interest IN ('personal', 'professional', 'both')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add comments for better understanding (optional but good practice)
COMMENT ON TABLE public.waitlist IS 'Stores entries for the Sarthi.me waitlist.';
COMMENT ON COLUMN public.waitlist.email IS 'User''s email address (unique).';
COMMENT ON COLUMN public.waitlist.first_name IS 'User''s first name.';
COMMENT ON COLUMN public.waitlist.interest IS 'User''s primary interest area.';

-- Function to automatically update the 'updated_at' timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = timezone('utc'::text, now());
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Trigger to call the function before any update on the waitlist table
-- Drop the trigger first if it exists, to avoid errors on re-run
DROP TRIGGER IF EXISTS update_waitlist_updated_at_trigger ON public.waitlist;
CREATE TRIGGER update_waitlist_updated_at_trigger
BEFORE UPDATE ON public.waitlist
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create an index on the email column for faster lookups, if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);

-- Enable Row Level Security (RLS) on the table
-- This is a critical security step.
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Policies for Row Level Security:
-- Remove existing policies to avoid conflicts if re-running (be cautious if you have custom policies)
DROP POLICY IF EXISTS "Allow public insert access for waitlist" ON public.waitlist;
-- DROP POLICY IF EXISTS "Allow authenticated read access for waitlist" ON public.waitlist; -- Example if you had one

-- 1. Policy to allow anyone (anonymous users) to insert into the waitlist.
CREATE POLICY "Allow public insert access for waitlist"
ON public.waitlist
FOR INSERT
TO anon -- Applies to anonymous users
WITH CHECK (true); -- The insert is allowed if this condition is true

-- Optional: If authenticated users should also be able to join the waitlist (e.g. if they log in first)
-- DROP POLICY IF EXISTS "Allow authenticated insert access for waitlist" ON public.waitlist;
-- CREATE POLICY "Allow authenticated insert access for waitlist"
-- ON public.waitlist
-- FOR INSERT
-- TO authenticated -- Applies to logged-in users
-- WITH CHECK (true);

-- Note: Read policies are not strictly required for the waitlist *form* to function,
-- but you would need them if you plan to display waitlist data or count.
-- Example: Allow authenticated users (e.g., an admin role) to read all data.
-- This is just an example, tailor it to your needs.
-- DROP POLICY IF EXISTS "Allow admin read access" ON public.waitlist;
-- CREATE POLICY "Allow admin read access"
-- ON public.waitlist
-- FOR SELECT
-- TO authenticated -- Or a specific role like 'service_role' or a custom admin role
-- USING (true); -- Or using (auth.role() = 'admin_user_role')

-- Grant usage on schema and permissions on table to relevant roles
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.waitlist TO anon, authenticated, service_role;
-- If your ID column is SERIAL or BIGSERIAL, you might need to grant sequence permissions:
-- GRANT USAGE, SELECT ON SEQUENCE public.waitlist_id_seq TO anon, authenticated, service_role; -- Adjust sequence name if needed

-- Ensure replication identity is set if you use Supabase real-time features or logical replication
-- ALTER TABLE public.waitlist REPLICA IDENTITY FULL;

SELECT 'Waitlist table setup script completed. Please verify RLS policies and table structure.' AS result;
