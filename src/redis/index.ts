import dotenv from "dotenv";
dotenv.config();
import { RedisClientType, createClient } from "redis";

let client: RedisClientType;

export const initializeRedisClient = async () => {
    client = createClient({
        url: process.env.REDIS_URL,
        socket: {
            port: Number(process.env.REDIS_PORT),
        },
    });

    try {
        await client.connect();
        console.log(
            "⚡️[redis]: Redis connection has been established successfully."
        );
    } catch (error) {}
};

export const getRedisClient = () => {
    return client;
};

export const isRedisWorking = () => {
    // verify wheter there is an active connection
    // to a Redis server or not
    return !!client?.isOpen;
};

export const getRedisCache = async (key: string) => {
    if (isRedisWorking()) {
        try {
            return await client.get(key);
        } catch (error) {}
    }
};

export const setRedisCache = async (key: string, value: string) => {
    if (isRedisWorking()) {
        try {
            return await client.set(key, value);
        } catch (error) {}
    }
};

export const deleteRedisCache = async (key: string) => {
    if (isRedisWorking()) {
        try {
            return await client.del(key);
        } catch (error) {}
    }
};

export const setWithExpiry = async (key: any, value: any, expiry: any) => {
    if (isRedisWorking()) {
        try {
            return await client.set(key, value, "EX", expiry);
        } catch (error) {}
    }
};
