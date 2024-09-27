"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const _1 = __importDefault(require("."));
const constants_1 = require("../constant/constants");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: () => (0, uuid_1.v4)(),
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: constants_1.FIRST_NAME_REQUIRED,
            },
            notNull: {
                msg: constants_1.FIRST_NAME_NOT_NULL,
            },
        },
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: constants_1.LAST_NAME_REQUIRED,
            },
            notNull: {
                msg: constants_1.LAST_NAME_NOT_NULL,
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
    tableName: "users",
    modelName: "user",
});
exports.default = User;
