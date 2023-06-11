import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Item extends Model {
  public id!: number;
  public ItemNo!: string;
  public Description!: string;
  public Rate!: string;
  public Qty!: string;
  public Amount!: string;
  public Unit!: string;
}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    ItemNo: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    Description: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    Rate: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    Qty: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    Amount: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    Unit: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
  },
  {
    tableName: 'items',
    sequelize,
  }
);

export default Item;
