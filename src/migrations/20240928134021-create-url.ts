"use strict";

import { DataTypes, QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import {
    FIXTURE_ID_NOT_NULL,
    FIXTURE_ID_REQUIRED,
    ORIGINAL_URL_NOT_NULL,
    ORIGINAL_URL_REQUIRED,
    UNIQUE_CODE_NOT_NULL,
    UNIQUE_CODE_REQUIRED,
    UNIQUE_URL_NOT_NULL,
    UNIQUE_URL_REQUIRED,
} from "../constant/constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable("urls", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            urlId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: () => uuidv4(),
            },
            originalUrl: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: ORIGINAL_URL_REQUIRED,
                    },
                    notNull: {
                        msg: ORIGINAL_URL_NOT_NULL,
                    },
                },
            },
            uniqueUrl: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: UNIQUE_URL_REQUIRED,
                    },
                    notNull: {
                        msg: UNIQUE_URL_NOT_NULL,
                    },
                },
            },
            fixtureId: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: FIXTURE_ID_REQUIRED,
                    },
                    notNull: {
                        msg: FIXTURE_ID_NOT_NULL,
                    },
                },
            },
            uniqueCode: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: {
                        msg: UNIQUE_CODE_REQUIRED,
                    },
                    notNull: {
                        msg: UNIQUE_CODE_NOT_NULL,
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
        await queryInterface.dropTable("urls");
    },
};
