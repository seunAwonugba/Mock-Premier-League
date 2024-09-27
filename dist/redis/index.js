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
exports.setWithExpiry = exports.deleteCache = exports.setRedisCache = exports.getRedisCache = exports.isRedisWorking = exports.initializeRedisClient = exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redis_1 = require("redis");
const initializeRedisClient = () => __awaiter(void 0, void 0, void 0, function* () {
    exports.client = (0, redis_1.createClient)({
        url: process.env.REDIS_URL,
        socket: {
            port: Number(process.env.REDIS_PORT),
        },
    });
    try {
        yield exports.client.connect();
        console.log("⚡️[redis]: Redis connection has been established successfully.");
        return exports.client;
    }
    catch (error) { }
});
exports.initializeRedisClient = initializeRedisClient;
const isRedisWorking = () => {
    // verify wheter there is an active connection
    // to a Redis server or not
    return !!(exports.client === null || exports.client === void 0 ? void 0 : exports.client.isOpen);
};
exports.isRedisWorking = isRedisWorking;
const getRedisCache = (key) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, exports.isRedisWorking)()) {
        try {
            return yield exports.client.get(key);
        }
        catch (error) { }
    }
});
exports.getRedisCache = getRedisCache;
const setRedisCache = (key, value) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, exports.isRedisWorking)()) {
        try {
            return yield exports.client.set(key, value);
        }
        catch (error) { }
    }
});
exports.setRedisCache = setRedisCache;
const deleteCache = (key) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, exports.isRedisWorking)()) {
        try {
            return yield exports.client.del(key);
        }
        catch (error) { }
    }
});
exports.deleteCache = deleteCache;
const setWithExpiry = (key, value, expiry) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, exports.isRedisWorking)()) {
        try {
            return yield exports.client.set(key, value, "EX", expiry);
        }
        catch (error) { }
    }
});
exports.setWithExpiry = setWithExpiry;
