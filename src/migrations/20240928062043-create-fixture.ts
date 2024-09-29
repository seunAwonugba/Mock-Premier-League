"use strict";

import { DataTypes, QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import {
    AWAY_TEAM_NOT_NULL,
    AWAY_TEAM_REQUIRED,
    COMPLETED,
    FIXTURE_DATE_NOT_NULL,
    FIXTURE_DATE_REQUIRED,
    HOME_TEAM_NOT_NULL,
    HOME_TEAM_REQUIRED,
    INVALID_MATCH_STATUS,
    LIVE,
    PENDING,
} from "../constant/constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable("fixtures", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            fixtureId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: () => uuidv4(),
            },
            homeTeamId: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: HOME_TEAM_REQUIRED,
                    },
                    notNull: {
                        msg: HOME_TEAM_NOT_NULL,
                    },
                },
            },
            awayTeamId: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: AWAY_TEAM_REQUIRED,
                    },
                    notNull: {
                        msg: AWAY_TEAM_NOT_NULL,
                    },
                },
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: PENDING,
                validate: {
                    isIn: {
                        args: [[COMPLETED, PENDING, LIVE]],
                        msg: INVALID_MATCH_STATUS,
                    },
                },
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: FIXTURE_DATE_REQUIRED,
                    },
                    notNull: {
                        msg: FIXTURE_DATE_NOT_NULL,
                    },
                },
            },
            homeTeamScore: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "0",
            },
            awayTeamScore: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "0",
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
        await queryInterface.dropTable("fixtures");
    },
};
