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
    console.log("Adding payment_date to invoices table...");
    await client.query(`
      ALTER TABLE public.invoices 
      ADD COLUMN IF NOT EXISTS payment_date DATE;
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
