import { Pool } from "pg";
import dotenv from "dotenv"
dotenv.config()

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } 
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
})

export const postgressDB = async() => {
  try {
      const client = await pool.connect()
      console.log("PostgreSQL connected")
      client.release()
  } 
  catch(error){
      console.log("PostgreSQL connection error", error)
  }
}


export const setWorkspaceSchema = async (workspaceId: string) => {
  await pool.query(`SET search_path TO workspace_${workspaceId}`);
}
