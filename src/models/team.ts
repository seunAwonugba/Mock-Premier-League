"use strict";

import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import sequelize from ".";
import { v4 as uuidv4 } from "uuid";
import {
    TEAM_NAME_NOT_NULL,
    TEAM_NAME_REQUIRED,
    UNIQUE_TEAM,
    UNIQUE_TEAM_CODE,
} from "../constant/constants";

class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
    declare id: CreationOptional<number>;
    declare teamId: string;
    declare name: string;

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
Team.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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

        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize: sequelize!,
        tableName: "teams",
        modelName: "team",
    }
);
export default Team;
