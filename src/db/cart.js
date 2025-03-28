import sequelize from "./index.db";
import { DataTypes, Model } from "sequelize";

class Cart extends Model{}

Cart.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId:{
        type: DataTypes.INTEGER
    },
    productId:{
        type: DataTypes.INTEGER
    },
    quantity:{
        type: DataTypes.INTEGER
    }
},
{
    sequelize,
    modelName: 'cart',
    timestamps: true,
}
  

)
export default Cart;