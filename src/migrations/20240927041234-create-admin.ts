"use strict";
import { DataTypes, QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import {
    EMAIL_NOT_NULL,
    EMAIL_REQUIRED,
    NAME_NOT_NULL,
    NAME_REQUIRED,
    PASSWORD_NOT_NULL,
    PASSWORD_REQUIRED,
    UNIQUE_EMAIL,
    UNIQUE_EMAIL_CODE,
    VALID_EMAIL,
} from "../constant/constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable("admins", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            adminId: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: () => uuidv4(),
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: NAME_REQUIRED,
                    },
                    notNull: {
                        msg: NAME_NOT_NULL,
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    name: UNIQUE_EMAIL_CODE,
                    msg: UNIQUE_EMAIL,
                },
                validate: {
                    notEmpty: {
                        msg: EMAIL_REQUIRED,
                    },
                    notNull: {
                        msg: EMAIL_NOT_NULL,
                    },
                    isEmail: {
                        msg: VALID_EMAIL,
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: PASSWORD_REQUIRED,
                    },
                    notNull: {
                        msg: PASSWORD_NOT_NULL,
                    },
                },
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        });
    },
    async down(queryInterface: QueryInterface) {
        await queryInterface.dropTable("admins");
    },
};
