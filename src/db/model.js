import { DataTypes, Model } from  'sequelize';
import sequelize from "../db/index.db.js";
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
          modelName: 'user_tb'
      },
)

// User.hasOne(Otp, { foreignKey: 'email', sourceKey: 'email' });
// Otp.belongsTo(User, { foreignKey: 'email', targetKey: 'email' });

export default User;