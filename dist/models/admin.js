"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const uuid_1 = require("uuid");
const constants_1 = require("../constant/constants");
class Admin extends sequelize_1.Model {
}
Admin.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    adminId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: () => (0, uuid_1.v4)(),
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: constants_1.NAME_REQUIRED,
            },
            notNull: {
                msg: constants_1.NAME_NOT_NULL,
            },
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: {
            name: constants_1.UNIQUE_EMAIL_CODE,
            msg: constants_1.UNIQUE_EMAIL,
        },
        validate: {
            notEmpty: {
                msg: constants_1.EMAIL_REQUIRED,
            },
            notNull: {
                msg: constants_1.EMAIL_NOT_NULL,
            },
            isEmail: {
                msg: constants_1.VALID_EMAIL,
            },
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: constants_1.PASSWORD_REQUIRED,
            },
            notNull: {
                msg: constants_1.PASSWORD_NOT_NULL,
            },
        },
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: _1.default,
    tableName: "admins",
    modelName: "admin",
});
exports.default = Admin;
