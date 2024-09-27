import dotenv from "dotenv";
dotenv.config();

const config = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DEV_DB,
        host: process.env.DB_HOST_DEV,
        dialect: process.env.DB_DIALECT,
        // ssl: true,
        // dialectOptions: {
        //         ssl: {
        //             require: true,
        //             rejectUnauthorized: false,
        //         },
        //         native: true
        //     },
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.TEST_DB,
        host: process.env.DB_HOST_TEST,
        dialect: process.env.DB_DIALECT,
        // ssl: true,
        // dialectOptions: {
        //         ssl: {
        //             require: true,
        //             rejectUnauthorized: false,
        //         },
        //         native: true
        //     },
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.PROD_DB,
        host: process.env.DB_HOST_PROD,
        dialect: process.env.DB_DIALECT,
        //  ssl: true,
        // dialectOptions: {
        //         ssl: {
        //             require: true,
        //             rejectUnauthorized: false,
        //         },
        //         native: true
        //     },
    },
};

export default config;
module.exports = config;
