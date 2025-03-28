import { Sequelize } from "sequelize";

const sequelize = new Sequelize ({
    database: "user_db",
    username: "postgres",
    password: "root",
    host: "localhost",
    dialect: "postgres",
    logging: false
});


export default sequelize;