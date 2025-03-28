import sequelize from "./index.db";
import { DataTypes, Model } from "sequelize";

class OrderItem extends Model{}

OrderItem.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    orderId: {
        type: DataTypes.INTEGER,
    },
    productId: {
        type: DataTypes.INTEGER,

    },
    quantity: {
        type: DataTypes.INTEGER,

    },
    price:{
        type: DataTypes.FLOAT,
    }
},
{
    sequelize,
    modelName: 'order_item'
}
)

export default OrderItem;