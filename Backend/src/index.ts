import express from "express";
import {startup} from "./startup/route";
import { mongoDB } from "./config/db.mongo";
import { postgressDB } from "./config/db.postgress";
import cors from 'cors'

const app = express()

app.use(cors({
    origin: "*"
}))

startup(app)    

postgressDB()
mongoDB()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})