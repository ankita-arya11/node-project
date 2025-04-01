import { DataTypes, Model } from 'sequelize';
class Cart extends Model {
  static initModel(sequelize) {
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
  }

  static associate(models) {
    Cart.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Cart.belongsTo(models.Product, { foreignKey: 'productId' });
  }
}

export default Cart;
