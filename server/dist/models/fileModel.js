"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
//Defining your Table Schema via Sequelize Models 
class Product extends sequelize_1.Model {
}
Product.init({
    item_no: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    rate: {
        type: sequelize_1.DataTypes.FLOAT,
        validate: {
            isFloat: true
        }
    },
    qty: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            min: { args: [0], msg: "Qty can't be negative" }
        }
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        validate: {
            isFloat: true
        }
    }
}, {
    sequelize: db_1.default,
    modelName: 'product',
    timestamps: false
});
exports.default = Product;
