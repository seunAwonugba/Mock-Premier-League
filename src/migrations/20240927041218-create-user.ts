"use strict";

import { DataTypes, QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import {
    EMAIL_NOT_NULL,
    EMAIL_REQUIRED,
    FIRST_NAME_NOT_NULL,
    FIRST_NAME_REQUIRED,
    LAST_NAME_NOT_NULL,
    LAST_NAME_REQUIRED,
    PASSWORD_NOT_NULL,
    PASSWORD_REQUIRED,
    VALID_EMAIL,
} from "../constant/constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: () => uuidv4(),
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: FIRST_NAME_REQUIRED,
                    },
                    notNull: {
                        msg: FIRST_NAME_NOT_NULL,
                    },
                },
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: LAST_NAME_REQUIRED,
                    },
                    notNull: {
                        msg: LAST_NAME_NOT_NULL,
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
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
        await queryInterface.dropTable("users");
    },
};
