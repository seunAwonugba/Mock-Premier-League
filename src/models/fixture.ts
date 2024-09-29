"use strict";

import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
} from "sequelize";
import sequelize from ".";
import { v4 as uuidv4 } from "uuid";

import {
    HOME_TEAM_REQUIRED,
    HOME_TEAM_NOT_NULL,
    AWAY_TEAM_REQUIRED,
    AWAY_TEAM_NOT_NULL,
    COMPLETED,
    PENDING,
    LIVE,
    INVALID_MATCH_STATUS,
    FIXTURE_DATE_REQUIRED,
    FIXTURE_DATE_NOT_NULL,
} from "../constant/constants";

class Fixture extends Model<
    InferAttributes<Fixture>,
    InferCreationAttributes<Fixture>
> {
    declare id: CreationOptional<number>;
    declare fixtureId: string;
    declare homeTeamId: string;
    declare awayTeamId: string;
    declare status: string;
    declare homeTeamScore: string;
    declare awayTeamScore: string;
    declare date: Date;

    // timestamps!
    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associations: {};
}
Fixture.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize: sequelize!,
        tableName: "fixtures",
        modelName: "fixture",
    }
);
export default Fixture;
