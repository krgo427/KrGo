import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wolekowihkrkpyyddfjh.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_srijSz-Qs4QeCK7DCNgOfw_6lmwijBN';

export const supabase = createClient(supabaseUrl, supabaseKey);
