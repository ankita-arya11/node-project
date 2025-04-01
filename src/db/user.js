import { DataTypes, Model } from 'sequelize';
import sequelize from './db.js';
import Order from './order.js'; 
import Cart from './cart.js';

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
      allowNull: false,  
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,  
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,  
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user_tb',
    timestamps: true,
  }
);

User.hasMany(Order, { foreignKey: 'userId' });
User.hasMany(Cart, { foreignKey: 'userId' });

export default User;
