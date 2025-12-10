import mongoose from "mongoose";


const columnSchema = new mongoose.Schema({
    columnName: String,
    dataType: String
})

const tableSchema = new mongoose.Schema({
    tableName: String,
    columns: [columnSchema],
    rows: [[mongoose.Schema.Types.Mixed]]
})


const workspaceSchema = new mongoose.Schema({
    workspaceId: String,
    name : String,
    tables: [tableSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Workspace", workspaceSchema)
