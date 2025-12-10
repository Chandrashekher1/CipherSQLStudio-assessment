import express from "express";
import workspaceRoute from "../routes/workspace.route";
import sqlRoute from "../routes/sql.route";

export const startup = (app : express.Application) => {   
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use('/create', workspaceRoute)
    app.use('/sql', sqlRoute)
}