import { DataTypes, Model } from "sequelize";
import sequelize from './db.js';
import Order from "./order.js";
import Product from "./product.js";

class OrderItem extends Model {}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
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
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_item_tb',
    timestamps: true,
  }
);

OrderItem.belongsTo(Order, { foreignKey: 'orderId', onDelete: "CASCADE" });
OrderItem.belongsTo(Product, { foreignKey: 'productId',   onDelete: "CASCADE" });

export default OrderItem;
