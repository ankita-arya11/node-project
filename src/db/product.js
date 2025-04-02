import { DataTypes, Model } from 'sequelize';

class Product extends Model {
  static initModel(sequelize) {
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
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: true
        }
      },
      {
        sequelize,
        modelName: 'Product',
        tableName: 'product_tb',
        timestamps: true,
      }
    );
  }

  static associate(models) {
    Product.hasMany(models.Cart, { foreignKey: 'productId' });
    Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
  }
}

export default Product;
