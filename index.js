import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './src/db/index.db.js';
import router from './src/route/route.js';
import dotenv from "dotenv";


dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "src", "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static(uploadsDir));


const PORT = 5000;

async function connectDb() {
    try {
        await sequelize.authenticate();
        console.log("✅ DB connected successfully");
        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error("❌ DB Connection Failed:", error);
        process.exit(1); 
    }
}
connectDb();

app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
});

