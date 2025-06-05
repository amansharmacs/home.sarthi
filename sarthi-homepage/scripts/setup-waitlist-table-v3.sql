-- Ensure the public schema exists
CREATE SCHEMA IF NOT EXISTS public;

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

-- Add comments for clarity
COMMENT ON TABLE public.waitlist IS 'Stores entries for the Sarthi.me waitlist.';
COMMENT ON COLUMN public.waitlist.email IS 'User''s email address (must be unique).';
COMMENT ON COLUMN public.waitlist.first_name IS 'User''s first name (optional).';
COMMENT ON COLUMN public.waitlist.interest IS 'User''s primary interest area (optional).';

-- Function to automatically update the 'updated_at' timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = timezone('utc'::text, now());
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Trigger to call the function before any update on the waitlist table
DROP TRIGGER IF EXISTS update_waitlist_updated_at_trigger ON public.waitlist;
CREATE TRIGGER update_waitlist_updated_at_trigger
BEFORE UPDATE ON public.waitlist
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create an index on the email column for faster lookups, if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);

-- Enable Row Level Security (RLS) on the table
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to ensure a clean setup
DROP POLICY IF EXISTS "Allow public insert access for waitlist" ON public.waitlist;
DROP POLICY IF EXISTS "Allow authenticated user insert access for waitlist" ON public.waitlist;

-- Policy to allow anonymous users to insert into the waitlist.
CREATE POLICY "Allow public insert access for waitlist"
ON public.waitlist
FOR INSERT
TO anon -- Special role for anonymous users
WITH CHECK (true); -- The insert is allowed if this condition is true

-- Policy to allow authenticated users to insert into the waitlist.
CREATE POLICY "Allow authenticated user insert access for waitlist"
ON public.waitlist
FOR INSERT
TO authenticated -- Special role for logged-in users
WITH CHECK (true);

-- Grant necessary permissions on the schema and table to the relevant roles
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.waitlist TO anon, authenticated, service_role;
-- If your ID column was SERIAL/BIGSERIAL (it's UUID here, so not strictly needed for sequence):
-- GRANT USAGE, SELECT ON SEQUENCE public.waitlist_id_seq TO anon, authenticated, service_role;

SELECT 'Waitlist table setup script completed successfully. RLS policies for insert are active for anon and authenticated users.' AS result;
