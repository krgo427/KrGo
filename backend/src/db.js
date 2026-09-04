import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Function to initialize the database table
export const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        website_type VARCHAR(255),
        time_slot VARCHAR(255),
        date_label TEXT,
        timestamp VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database initialized: leads table ensured');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default pool;
