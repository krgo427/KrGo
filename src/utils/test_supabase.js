import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
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
