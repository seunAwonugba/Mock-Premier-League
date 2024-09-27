"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const { PORT, HOST } = process.env;
const port = Number(PORT);
const host = String(HOST);
app.use(express_1.default.json());
app.listen(port, host, () => {
    console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
});
