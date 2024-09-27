import "dotenv/config";
import express from "express";
import sequelize from "./models";
import { initializeRedisClient } from "./redis";

const app = express();

const { PORT, HOST } = process.env;
const port = Number(PORT);
const host = String(HOST);

app.use(express.json());

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
