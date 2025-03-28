import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/index.db.js';

class Otp extends Model {}

Otp.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, 
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiresAt: {  
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Otp',
        tableName: 'otp_tb', 
        timestamps: false, 
    }
);

export default Otp;
