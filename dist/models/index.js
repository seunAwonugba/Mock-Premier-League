"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const process_1 = __importDefault(require("process"));
const config_1 = __importDefault(require("../config/config"));
let sequelize;
if (config_1.default.development) {
    sequelize = new sequelize_1.Sequelize(process_1.default.env.DEV_DB, process_1.default.env.DB_USERNAME, process_1.default.env.DB_PASSWORD, {
        host: process_1.default.env.DB_HOST_DEV,
        dialect: "postgres",
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //         rejectUnauthorized: false,
        //     },
        //     native: true
        // },
    });
}
else if (config_1.default.test) {
    sequelize = new sequelize_1.Sequelize(process_1.default.env.TEST_DB, process_1.default.env.DB_USERNAME, process_1.default.env.DB_PASSWORD, {
        host: process_1.default.env.DB_HOST_TEST,
        dialect: "postgres",
        // ssl: true,
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //         rejectUnauthorized: false,
        //     },
        //     native: true,
        // },
    });
}
else if (config_1.default.production) {
    sequelize = new sequelize_1.Sequelize(process_1.default.env.PROD_DB, process_1.default.env.DB_USERNAME, process_1.default.env.DB_PASSWORD, {
        host: process_1.default.env.DB_HOST_PROD,
        dialect: "postgres",
        //  ssl: true,
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //         rejectUnauthorized: false,
        //     },
        //     native: true,
        // },
    });
}
exports.default = sequelize;
