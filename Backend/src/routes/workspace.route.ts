import express from "express";
import Workspace from "../models/workspace.model";
import { client } from "../config/db.postgress";

const router = express.Router();

router.post('/', async (req,res) => {
    try{
        const workspaceId = Date.now().toString()

        await client.query(`CREATE SCHEMA IF NOT EXISTS workspace_${workspaceId}`)

        const workspace = await Workspace.create({  
            workspaceId,
            name: req.body.name,
            tables: [],
            createdAt: new Date(),
            updatedAt: new Date()
        })
        res.status(200).json({success: true, workspace, workspaceId})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

export default router