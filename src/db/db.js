import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import User from './user.js';
import Cart from './cart.js';
import Order from './order.js';
import OrderItem from './orderItem.js';
import Product from './product.js';

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
        await sequelize.sync({ alter: true });  
    } catch (error) {
        console.error("❌ DB Connection Failed:", error);
        process.exit(1); 
    }
}

export default sequelize;
