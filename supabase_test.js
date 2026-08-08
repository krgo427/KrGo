import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ldjqaxhjpoxdshulwnsv.supabase.co';
const supabaseKey = 'sb_publishable_TcuRRpIFBgCa8o9XIwsULw_AEEMn0F7';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log("Testing Supabase Insert...");
  const { data, error } = await supabase.from('contact_requests').insert([{
    name: 'Test Name',
    email: 'test@example.com',
    phone: '1234567890',
    message: 'Test Message'
  }]);
  
  if (error) {
    console.error("Supabase Error:", error);
  } else {
    console.log("Supabase Success:", data);
  }
}

testInsert();
