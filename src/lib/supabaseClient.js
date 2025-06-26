import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://efpeuaqgijrbxvlbjgga.supabase.co';
const supabaseKey = 'YOUR_ACTUAL_ANON_KEY'; // Replace this
export const supabase = createClient(supabaseUrl, supabaseKey);


