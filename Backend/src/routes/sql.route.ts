    import express from "express";
    import { pool, setWorkspaceSchema } from "../config/db.postgress";

    const router = express.Router()

    router.post('/create-table', async (req,res) => {
        const {workspaceId,tableName,columns} = req.body

        console.log(columns);
        console.log(tableName);

        try{
            await setWorkspaceSchema(workspaceId)

            const checkQuery = `
            SELECT EXISTS (
                SELECT 1 
                FROM information_schema.tables 
                WHERE table_schema = 'workspace_${workspaceId}'
                AND table_name = $1
            );
        `
        const checkResult = await pool.query(checkQuery, [tableName]);
        const alreadyExists = checkResult.rows[0].exists;

        if (alreadyExists) {
            return res.status(409).json({
                success: false,
                message: `Table "${tableName}" already exists.`,
            });
        }
            const columnsDef = columns.map((column : any) => {
                return `"${column.name}" ${column.type}`
            }).join(', ')            
            const query = `CREATE TABLE "${tableName}" (${columnsDef})`
            await pool.query(query)
            res.status(200).json({success:true,message: "Table created successfully", tableName})
        }
        catch(error: any){
            console.log(error)
            res.status(500).json({success:false,message: "Failed to create table", error: error.message})
        }
    })

    router.post('/insert-table', async (req,res) => {
        const {workspaceId,tableName,row} = req.body
        try{
            await setWorkspaceSchema(workspaceId)
            
            const columns = Object.keys(row)
            const values = Object.values(row)

            const sql = values.map((_, i) => `$${i + 1}`).join(", ");
            
            const query = `INSERT INTO "${tableName}" (${columns.map(c => `"${c}"`).join(', ')}) VALUES (${sql})`
            await pool.query(query, values)
            res.status(200).json({success:true,message: "Row inserted successfully", tableName})
        }
        catch(error:any){
            console.log(error)
            res.status(500).json({success:false,message: "Failed to insert row", error: error.message})
        }
    })

    router.post('/run-query', async (req,res) => {
        const {workspaceId,query} = req.body
        try{
            await setWorkspaceSchema(workspaceId)
            const result = await pool.query(query)

            res.status(200).json({success:true,message: "Query executed successfully", rows: result.rows})
        }
        catch(error){
            console.log(error)
            res.status(500).json({success:false,message: "Failed to execute query", error: error})
        }
    })

    router.get('/tables/:workspaceId', async (req, res) => {
        try {
            const workspaceId = req.params.workspaceId;
            console.log(workspaceId);

            if (!workspaceId) {
                return res.status(400).json({
                    success: false,
                    message: "workspaceId is required",
                });
            }

            await setWorkspaceSchema(workspaceId);

            const schemaName = `workspace_${workspaceId}`;
            const query = `
                SELECT 
                    table_name,
                    column_name,
                    data_type
                FROM information_schema.columns
                WHERE table_schema = $1
                ORDER BY table_name, ordinal_position;
            `;

            const result = await pool.query(query, [schemaName]);

            if (result.rows.length === 0) {
                return res.status(200).json({
                    success: true,
                    tables: [],
                    message: "No tables found in this workspace",
                });
            }

            const tables: any = {};

            result.rows.forEach(row => {
                if (!tables[row.table_name]) {
                    tables[row.table_name] = [];
                }

                tables[row.table_name].push({
                    name: row.column_name,
                    type: row.data_type,
                });
            });

            const formattedTables = Object.keys(tables).map(name => ({
                tableName: name,
                columns: tables[name],
            }));

            return res.status(200).json({
                success: true,
                tables: formattedTables,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch tables",
                error: error.message,
            });
        }
    });

    export default router