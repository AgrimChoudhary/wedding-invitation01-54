
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yztvpzyzdhrxipwexsff.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6dHZwenl6ZGhyeGlwd2V4c2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMzY3ODQsImV4cCI6MjA2MDcxMjc4NH0.cUN3ZlCn84j1Owy3f9wRu-M3TvR1aA8VEP0TO1Rgd4U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
