import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type WaitlistEntry = {
  id?: string
  email: string
  first_name?: string
  phone_number?: string
  country_code?: string
  country_name?: string
  interest?: "personal" | "professional" | "both"
  created_at?: string
  updated_at?: string
}
