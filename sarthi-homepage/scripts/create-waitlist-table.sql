-- Enable Row Level Security if not already enabled
-- alter table public.waitlist enable row level security;

-- Drop existing table if it exists (optional, be careful with existing data)
-- DROP TABLE IF EXISTS public.waitlist;

-- Create the waitlist table
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

-- Add comments to the table and columns for clarity
COMMENT ON TABLE public.waitlist IS 'Stores entries for the Sarthi.me waitlist.';
COMMENT ON COLUMN public.waitlist.id IS 'Unique identifier for the waitlist entry.';
COMMENT ON COLUMN public.waitlist.email IS 'Email address of the user joining the waitlist (must be unique).';
COMMENT ON COLUMN public.waitlist.first_name IS 'First name of the user (optional).';
COMMENT ON COLUMN public.waitlist.phone_number IS 'Phone number of the user (optional).';
COMMENT ON COLUMN public.waitlist.country_code IS 'Country code for the phone number (optional).';
COMMENT ON COLUMN public.waitlist.country_name IS 'Country name for the phone number (optional).';
COMMENT ON COLUMN public.waitlist.interest IS 'User''s primary interest area (personal, professional, or both; optional).';
COMMENT ON COLUMN public.waitlist.created_at IS 'Timestamp of when the entry was created.';
COMMENT ON COLUMN public.waitlist.updated_at IS 'Timestamp of when the entry was last updated.';

-- Create a function to update the updated_at timestamp automatically
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = timezone('utc'::text, now()); 
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to call the function before any update
DROP TRIGGER IF EXISTS update_waitlist_updated_at ON public.waitlist;
CREATE TRIGGER update_waitlist_updated_at
BEFORE UPDATE ON public.waitlist
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create an index on the email column for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);

-- Enable Row Level Security (RLS) on the table
-- This is crucial for security. Policies will define who can do what.
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Remove any existing policies to start fresh (optional, use with caution)
-- DROP POLICY IF EXISTS "Allow public insert access for waitlist" ON public.waitlist;
-- DROP POLICY IF EXISTS "Allow read access to everyone" ON public.waitlist; -- If you had one

-- Create RLS policy to allow public (anonymous) inserts
CREATE POLICY "Allow public insert access for waitlist"
ON public.waitlist
FOR INSERT
WITH CHECK (true);

-- Optional: If you need to read the data (e.g., for a count), you might need a read policy.
-- For just inserting, the above is sufficient for anonymous users.
-- Example read policy (allows anyone to read all data - use with caution or restrict):
-- CREATE POLICY "Allow public read access for waitlist"
-- ON public.waitlist
-- FOR SELECT
-- USING (true);

GRANT ALL ON TABLE public.waitlist TO anon, authenticated, service_role;
GRANT ALL ON SEQUENCE public.waitlist_id_seq TO anon, authenticated, service_role; -- If you used SERIAL for ID

ALTER TABLE public.waitlist replica identity full;


SELECT 'Waitlist table created and RLS configured successfully.' AS status;
