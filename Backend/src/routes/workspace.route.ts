import express from "express";
import Workspace from "../models/workspace.model";
import { pool } from "../config/db.postgress";

const router = express.Router();

router.get('/', async (req,res) => {
    res.send("SQL backend running...")
})

router.post('/create', async (req,res) => {
    try{
        const workspaceId = Date.now().toString()

        await pool.query(`CREATE SCHEMA IF NOT EXISTS workspace_${workspaceId}`)

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
router.get("/all", async (req, res) => {
    const workspaces = await Workspace.find({});
    console.log(workspaces);
    
    res.status(200).json({ success: true, workspaces });
});


export default router