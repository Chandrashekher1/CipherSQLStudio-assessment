import express from "express";
import { client, setWorkSpaceSchema } from "../config/db.postgress";

const router = express.Router()

router.post('/create-table', async (req,res) => {
    const {workspaceId,tableName,columns} = req.body
    try{
        await setWorkSpaceSchema(workspaceId)
        const columnsDef = columns.map((column : any) => {
            return `${column.name} ${column.type}`
        }).join(', ')
        
        const query = `CREATE TABLE ${tableName} (${columnsDef})`
        await client.query(query)
        res.status(200).json({success:true,message: "Table created successfully", tableName})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message: "Internal Server Error"})
    }
})


router.post('/insert-row', async (req,res) => {
    const {workspaceId,tableName,columns} = req.body
    try{
        await setWorkSpaceSchema(workspaceId)
        const columnsDef = columns.map((column : any) => {
            return `${column.name} ${column.type}`
        }).join(', ')
        
        const query = `INSERT INTO ${tableName} (${columnsDef}) VALUES (${columnsDef})`
        await client.query(query)
        res.status(200).json({success:true,message: "Row inserted successfully", tableName})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message: "Internal Server Error"})
    }
})


router.post('/run-query', async (req,res) => {
    const {workspaceId,query} = req.body
    try{
        await setWorkSpaceSchema(workspaceId)
        const result = await client.query(query)

        res.status(200).json({success:true,message: "Query executed successfully", result})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message: "Internal Server Error"})
    }
})

export default router