import { DataTypes, Model } from "sequelize";
import sequelize from "./index.db.js";

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user_tb", 
      key: "id",
    },
    onDelete: "CASCADE",
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Completed", "Cancelled"),
    defaultValue: "Pending",
  },
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'order_tb',
  timestamps: true,
}
);

export default Order;
