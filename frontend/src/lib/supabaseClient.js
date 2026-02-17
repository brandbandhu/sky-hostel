import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // This will show in the browser console if env vars are missing
  // so you remember to set them in .env
  console.warn('Supabase URL or anon key is not set in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
