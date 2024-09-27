"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("./models"));
const redis_1 = require("./redis");
const cors_1 = __importDefault(require("cors"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
const { PORT, HOST, SESSION_SECRET, SESSION_NAME } = process.env;
const port = Number(PORT);
const host = String(HOST);
const sessionSecret = String(SESSION_SECRET);
const sessionName = String(SESSION_NAME);
const redisClient = (0, redis_1.getRedisClient)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.set("trust proxy", 1); // trust first proxy
// provides Redis session storage for Express
const redisStore = new connect_redis_1.default({
    client: redisClient,
    prefix: "mock_pl:",
});
app.use((0, express_session_1.default)({
    store: redisStore,
    resave: false,
    saveUninitialized: true,
    name: sessionName,
    secret: sessionSecret,
}));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.authenticate();
        console.log("⚡️[database]: Database connection has been established successfully.");
        yield (0, redis_1.initializeRedisClient)();
        app.listen(port, host, () => {
            console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
        });
    }
    catch (error) {
        console.log("😥 [database]: Unable to connect to the database:", error);
    }
});
startServer();
