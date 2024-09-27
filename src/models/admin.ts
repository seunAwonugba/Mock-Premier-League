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
    NAME_REQUIRED,
    NAME_NOT_NULL,
    UNIQUE_EMAIL_CODE,
    UNIQUE_EMAIL,
    EMAIL_REQUIRED,
    EMAIL_NOT_NULL,
    VALID_EMAIL,
    PASSWORD_REQUIRED,
    PASSWORD_NOT_NULL,
} from "../constant/constants";
class Admin extends Model<
    InferAttributes<Admin>,
    InferCreationAttributes<Admin>
> {
    declare id: CreationOptional<number>;
    declare adminId: string;
    declare name: string;
    declare email: string;
    declare password: string;

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
Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        adminId: {
            type: DataTypes.UUID,
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize: sequelize!,
        tableName: "admins",
        modelName: "admin",
    }
);
export default Admin;
