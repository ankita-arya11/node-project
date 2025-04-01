import { DataTypes, Model } from "sequelize";
import sequelize from './db.js';
import Product from "./product.js";
import User from "./user.js";

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Cart',
    tableName: 'cart_tb',
    timestamps: true,
  }
);

Cart.belongsTo(User, { foreignKey: 'userId', onDelete: "CASCADE" });
Cart.belongsTo(Product, { foreignKey: 'productId' });

export default Cart;

