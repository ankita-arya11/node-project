import { DataTypes, Model } from "sequelize";
import sequelize from './db.js';
import User from "./user.js";
import OrderItem from "./orderItem.js";

class Order extends Model {}

Order.init(
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
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Completed", "Cancelled"),
      allowNull: false,
      defaultValue: "Pending",
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "order_tb",
    timestamps: true,
  }
);

Order.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Order.hasMany(OrderItem, { foreignKey: 'orderId' });

export default Order;
