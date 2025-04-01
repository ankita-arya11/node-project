import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

// Import models (without initializing associations yet)
import User from './user.js';
import Cart from './cart.js';
import Order from './order.js';
import OrderItem from './orderItem.js';
import Product from './product.js';
import Otp from './otp.js';

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
});

// Initialize all models
User.initModel(sequelize);
Product.initModel(sequelize);
Cart.initModel(sequelize);
Order.initModel(sequelize);
OrderItem.initModel(sequelize);


// Define associations after models are initialized
User.associate(sequelize.models);
Product.associate(sequelize.models);
Cart.associate(sequelize.models);
Order.associate(sequelize.models);
OrderItem.associate(sequelize.models);


// Function to connect to the database
export async function connectDb() {
    try {
        await sequelize.authenticate();
        console.log("✅ DB connected successfully");
        await sequelize.sync({ force: true });  // or use { alter: true } in production
    } catch (error) {
        console.error("❌ DB Connection Failed:", error);
        process.exit(1); 
    }
}

export default sequelize;
