import { DataTypes, Model } from  'sequelize';
import sequelize from "./index.db.js";
// import Otp from "../models/otp.model.js"; 

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING,
            
          },
          email: {
              type: DataTypes.STRING,
              unique: true
          },
          password: {
            type: DataTypes.STRING
          },
          phone: {
              type: DataTypes.STRING,
          },
          age: {
              type: DataTypes.INTEGER,
          },
          profile: {
              type: DataTypes.STRING,
              allowNull: true,
          }
        },
        {
          sequelize,
          modelName: 'User',
          tableName: 'user_tb',
          timestamps: true,
        } 
)

export default User;