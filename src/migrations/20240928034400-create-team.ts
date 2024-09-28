"use strict";

import { DataTypes, QueryInterface } from "sequelize";
import {
    UNIQUE_TEAM_CODE,
    UNIQUE_TEAM,
    TEAM_NAME_REQUIRED,
    TEAM_NAME_NOT_NULL,
} from "../constant/constants";
import { v4 as uuidv4 } from "uuid";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable("teams", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            teamId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: () => uuidv4(),
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    name: UNIQUE_TEAM_CODE,
                    msg: UNIQUE_TEAM,
                },
                validate: {
                    notEmpty: {
                        msg: TEAM_NAME_REQUIRED,
                    },
                    notNull: {
                        msg: TEAM_NAME_NOT_NULL,
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
        await queryInterface.dropTable("teams");
    },
};
