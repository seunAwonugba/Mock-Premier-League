"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = __importDefault(require("express"));
const rateLimit_1 = require("../middleware/rateLimit");
const users = express_1.default.Router();
exports.users = users;
users.use((0, rateLimit_1.rateLimitMiddleware)());
