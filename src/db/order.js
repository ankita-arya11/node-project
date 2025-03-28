import sequelize from "./index.db"
import { DataTypes, Model } from "sequelize";

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
  },
  totalAmount: {
    type: DataTypes.FLOAT,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
  }
}, {
  sequelize,
  modelName: 'order',
  timestamps: true,
})

export default Order;