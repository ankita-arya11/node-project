// import User from "./user";
// import Cart from "./cart";
// import Order from "./order";
// import OrderItem from "./orderItem";
// import Product from "./product";
import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize ({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host:     process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
});


export async function connectDb() {
    try {
        await sequelize.authenticate();
        console.log("✅ DB connected successfully");
        await sequelize.sync({ force: true });
    } catch (error) {
        console.error("❌ DB Connection Failed:", error);
        process.exit(1); 
    }
}


export default sequelize;