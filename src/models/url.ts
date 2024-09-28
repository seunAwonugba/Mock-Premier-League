"use strict";

import {
    Model,
    DataTypes,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";
import sequelize from ".";
import { v4 as uuidv4 } from "uuid";

import {
    ORIGINAL_URL_REQUIRED,
    ORIGINAL_URL_NOT_NULL,
    UNIQUE_URL_REQUIRED,
    UNIQUE_URL_NOT_NULL,
    FIXTURE_ID_REQUIRED,
    FIXTURE_ID_NOT_NULL,
    UNIQUE_CODE_REQUIRED,
    UNIQUE_CODE_NOT_NULL,
    UNIQUE_EMAIL,
    UNIQUE_EMAIL_CODE,
    UNIQUE_URL_CODE,
    UNIQUE_URL,
} from "../constant/constants";

class Url extends Model<InferAttributes<Url>, InferCreationAttributes<Url>> {
    declare id: CreationOptional<number>;
    declare urlId: string;
    declare originalUrl: string;
    declare uniqueUrl: string;
    declare fixtureId: string;
    declare uniqueCode: string;
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
    static associations: {
        // define association here
    };
}
Url.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
            unique: {
                name: UNIQUE_URL_CODE,
                msg: UNIQUE_URL,
            },
            validate: {
                notEmpty: {
                    msg: UNIQUE_CODE_REQUIRED,
                },
                notNull: {
                    msg: UNIQUE_CODE_NOT_NULL,
                },
            },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize: sequelize!,
        tableName: "urls",
        modelName: "url",
    }
);
export default Url;
