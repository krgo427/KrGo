const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  console.log("Connecting to database...");
  const client = await pool.connect();
  
  try {
    console.log("Adding client_type to clients table...");
    await client.query(`
      ALTER TABLE public.clients 
      ADD COLUMN IF NOT EXISTS client_type VARCHAR(50);
    `);
    
    console.log("Adding invoice_type to invoices table...");
    await client.query(`
      ALTER TABLE public.invoices 
      ADD COLUMN IF NOT EXISTS invoice_type VARCHAR(50) DEFAULT 'Standard';
    `);

    console.log("Migration successful!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    client.release();
    pool.end();
  }
}

migrate();
