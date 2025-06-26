import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://efpeuaqgijrbxvlbjgga.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmcGV1YXFnaWpyYnh2bGJqZ2dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0ODM4NTMsImV4cCI6MjA2NjA1OTg1M30.HnHjGUcYdmBcMwnzifHouOYrG9q72MuhtcH8svJ44_4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
