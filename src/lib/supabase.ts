import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type SIG = {
  id: string
  name: string
  acronym: string
  description: string
  focus_areas: string[]
  objectives: string[]
  requirements: string[]
  benefits: string[]
  image_url: string
}

export type VolunteerApplication = {
  id: string
  user_id: string
  sig_id: string
  status: string
  applied_at: string
  sig?: SIG
}