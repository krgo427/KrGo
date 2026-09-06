import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ldjqaxhjpoxdshulwnsv.supabase.co';
const supabaseKey = 'sb_publishable_TcuRRpIFBgCa8o9XIwsULw_AEEMn0F7';
console.log("URL:", supabaseUrl ? "Found" : "Missing");

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data: requests, error: fetchErr } = await supabase.from('contact_requests').select('*').limit(2);
  console.log("Requests fetch error:", fetchErr);
  console.log("Requests:", requests);

  if (requests && requests.length > 0) {
    const req = requests[0];
    console.log("Trying to insert client for request:", req.id);
    const { data: insertData, error: insertErr } = await supabase.from('clients').insert([{
      name: req.name || 'Test User',
      email: req.email || '',
      phone: req.phone || '',
      company: 'Test Company',
      notes: 'Test notes',
      is_deleted: false
    }]).select();
    console.log("Insert client error:", insertErr);
    console.log("Insert client data:", insertData);
    
    // Testing delete
    const { data: delData, error: delErr } = await supabase.from('contact_requests').update({ is_deleted: true }).eq('id', req.id).select();
    console.log("Delete request error:", delErr);
    console.log("Delete request data:", delData);
  }
}

test();
