import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { db, connectDB } from "./dbConnection.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Backend is Working!!!");
})

connectDB();

app.get('/fetch', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Books');
        console.log(result.rows);
        res.status(200).send(result.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error in Fetching - Api" })
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

