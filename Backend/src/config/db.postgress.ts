import { Client } from "pg"
import dotenv from "dotenv"
dotenv.config()

export const client = new Client({
   connectionString: process.env.POSTGRES_URL
})

export const postgressDB = async function connect(){
    try{
        await client.connect()
        console.log("PostgresDB connected")
    }
    catch(error){
        console.log("PostgresDB connection error", error)
    }
}


export const setWorkSpaceSchema = async  (workspaceId : string) => {
    await client.query(`SET search_path TO workspace_${workspaceId}`)
}
