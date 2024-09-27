"use strict";

import { Sequelize } from "sequelize";
import process from "process";
import config from "../config/config";

let sequelize: Sequelize | undefined;
if (config.development) {
    sequelize = new Sequelize(
        process.env.DEV_DB as string,
        process.env.DB_USERNAME as string,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST_DEV,
            dialect: "postgres",
            // dialectOptions: {
            //     ssl: {
            //         require: true,
            //         rejectUnauthorized: false,
            //     },
            //     native: true
            // },
        }
    );
} else if (config.test) {
    sequelize = new Sequelize(
        process.env.TEST_DB as string,
        process.env.DB_USERNAME as string,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST_TEST,
            dialect: "postgres",
            // ssl: true,
            // dialectOptions: {
            //     ssl: {
            //         require: true,
            //         rejectUnauthorized: false,
            //     },
            //     native: true,
            // },
        }
    );
} else if (config.production) {
    sequelize = new Sequelize(
        process.env.PROD_DB as string,
        process.env.DB_USERNAME as string,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST_PROD,
            dialect: "postgres",
            //  ssl: true,
            // dialectOptions: {
            //     ssl: {
            //         require: true,
            //         rejectUnauthorized: false,
            //     },
            //     native: true,
            // },
        }
    );
}

export default sequelize;
