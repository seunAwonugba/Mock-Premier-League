import dotenv from "dotenv";
dotenv.config();
import { RedisClientType, createClient } from "redis";
import { REDIS_LONG_TERM_CACHE_TIME } from "../constant/constants";

export let client: RedisClientType;

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
        return client;
    } catch (error) {}
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

export const deleteCache = async (key: string) => {
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

export const longTermCache = async (key: any, callback: () => Promise<any>) => {
    const getCache = await getRedisCache(key);

    if (getCache != null) {
        return JSON.parse(getCache);
    }

    const request = await callback();

    await setWithExpiry(
        key,
        JSON.stringify(request),
        REDIS_LONG_TERM_CACHE_TIME
    );

    return request;
};
