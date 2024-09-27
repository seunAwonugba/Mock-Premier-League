"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
exports.default = config;
module.exports = config;
