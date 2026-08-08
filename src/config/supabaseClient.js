import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ldjqaxhjpoxdshulwnsv.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_TcuRRpIFBgCa8o9XIwsULw_AEEMn0F7';

export const supabase = createClient(supabaseUrl, supabaseKey);
