"use strict";
import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";

import sequelize from ".";
import {
    FIRST_NAME_REQUIRED,
    FIRST_NAME_NOT_NULL,
    LAST_NAME_REQUIRED,
    LAST_NAME_NOT_NULL,
    UNIQUE_EMAIL_CODE,
    UNIQUE_EMAIL,
    EMAIL_REQUIRED,
    EMAIL_NOT_NULL,
    VALID_EMAIL,
    PASSWORD_REQUIRED,
    PASSWORD_NOT_NULL,
} from "../constant/constants";
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare userId: string;
    declare firstName: string;
    declare lastName: string;
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
    static associations: {};

    toJSON() {
        const { password, ...values } = this.get() as { password?: string };
        return values;
    }
}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        tableName: "users",
        modelName: "user",
        hooks: {
            beforeCreate: async (user: User) => {
                if (user.password) {
                    user.password = await bcryptjs.hash(
                        user.password,
                        Number(process.env.BCRYPTJS_SALT)
                    );
                }
            },
            beforeUpdate: async (user: User) => {
                if (user.password) {
                    if (user.changed("password")) {
                        user.password = await bcryptjs.hash(
                            user.password,
                            Number(process.env.BCRYPTJS_SALT)
                        );
                    }
                }
            },
        },
    }
);
export default User;
