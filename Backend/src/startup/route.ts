import express from "express";
import workspaceRoute from "../routes/workspace.route";
import sqlRoute from "../routes/sql.route";
import llmRoute from "../routes/llm.routes";

export const startup = (app : express.Application) => {   
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use('/workspace', workspaceRoute)
    app.use('/sql', sqlRoute)
    app.use('/llm', llmRoute)
}