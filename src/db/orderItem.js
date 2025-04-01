import { DataTypes, Model } from 'sequelize';

class OrderItem extends Model {
  static initModel(sequelize) {
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
  }

  static associate(models) {
    OrderItem.belongsTo(models.Order, { foreignKey: 'orderId', onDelete: 'CASCADE' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE' });
  }
}

export default OrderItem;
