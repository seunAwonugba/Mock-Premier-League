"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const constants_1 = require("../constant/constants");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable("users", {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: sequelize_1.DataTypes.INTEGER,
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
                createdAt: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE,
                },
            });
        });
    },
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable("users");
        });
    },
};
