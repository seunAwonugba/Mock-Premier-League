import "dotenv/config";
import express from "express";
import sequelize from "./models";
import { getRedisClient, initializeRedisClient } from "./redis";
import cors from "cors";
import RedisStore from "connect-redis";
import session from "express-session";
const app = express();

const { PORT, HOST, SESSION_SECRET, SESSION_NAME } = process.env;
const port = Number(PORT);
const host = String(HOST);
const sessionSecret = String(SESSION_SECRET);
const sessionName = String(SESSION_NAME);
const redisClient = getRedisClient();

app.use(cors());
app.use(express.json());
app.set("trust proxy", 1); // trust first proxy

// provides Redis session storage for Express
const redisStore = new RedisStore({
    client: redisClient,
    prefix: "mock_pl:",
});

app.use(
    session({
        store: redisStore,
        resave: false,
        saveUninitialized: true,
        name: sessionName,
        secret: sessionSecret,
    })
);
const startServer = async () => {
    try {
        await sequelize!.authenticate();
        console.log(
            "⚡️[database]: Database connection has been established successfully."
        );
        await initializeRedisClient();
        app.listen(port, host, () => {
            console.log(
                `⚡️[server]: Server is running at http://${host}:${port}`
            );
        });
    } catch (error) {
        console.log("😥 [database]: Unable to connect to the database:", error);
    }
};

startServer();
