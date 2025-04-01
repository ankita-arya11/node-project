import { DataTypes, Model } from 'sequelize';
import sequelize from './db.js';
import Cart from './cart.js';
import OrderItem from './orderItem.js';

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    category: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'product_tb',
    timestamps: true
  }
);

Product.hasMany(Cart, { foreignKey: 'productId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

export default Product;
