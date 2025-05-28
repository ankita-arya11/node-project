import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './src/route/route.js';
import dotenv from "dotenv";
import { connectDb } from './src/db/db.js';


dotenv.config();



const app = express();

app.use(express.json());
app.use("/api", router);
app.get('/', (req, res) => {
  res.send('Hello I am ankita!!!!');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "src", "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static(uploadsDir));

connectDb()

app.listen(process.env.PORT || 8000, () => {
  console.log(process.env.PORT, "port..");
    console.log(`🚀 Server is listening on port ${process.env.PORT}`);
});

