import { DataTypes, Model } from 'sequelize';

class Order extends Model {
  static initModel(sequelize) {
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
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),
          allowNull: false,
          defaultValue: 'Pending',
        },
      },
      {
        sequelize,
        modelName: 'Order',
        tableName: 'order_tb',
        timestamps: true,
      }
    );
  }

  static associate(models) {
    Order.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
  }
}

export default Order;
