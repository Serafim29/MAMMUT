import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Eroare: VITE_SUPABASE_URL sau VITE_SUPABASE_PUBLISHABLE_KEY lipsesc in proces.');
}

export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || ''
);

