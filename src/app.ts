import "dotenv/config";
import express from "express";
import sequelize from "./models";
import { initializeRedisClient } from "./redis";
import cors from "cors";
import RedisStore from "connect-redis";
import session from "express-session";
import { auth } from "./router/auth";
import { error } from "./middleware/error";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { team } from "./router/team";
import { users } from "./router/users";
import { fixture } from "./router/fixture";
import { unique } from "./router/unique";
import { admin } from "./router/admin";
const app = express();

const { PORT, HOST, SESSION_SECRET, SESSION_NAME } = process.env;
const port = Number(PORT);
const host = String(HOST);
const sessionSecret = String(SESSION_SECRET);
const sessionName = String(SESSION_NAME);

app.use(cors());
app.use(express.json());
app.set("trust proxy", 1); // trust first proxy

app.use("/api/v1/auth", auth);
app.use("/api/v1/team", team);
app.use("/api/v1/users", users);
app.use("/api/v1/admin", admin);
app.use("/api/v1/fixture", fixture);
app.use("/api/v1/unique", unique);

app.get("/", (req, res) => {
    return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        success: true,
        message: ReasonPhrases.OK,
    });
});

app.use("*", (req, res) => {
    return res.status(StatusCodes.NOT_FOUND).json({
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: `🤕 ${ReasonPhrases.NOT_FOUND}`,
    });
});

app.use(error);
const startServer = async () => {
    try {
        await sequelize!.authenticate();
        console.log(
            "⚡️[database]: Database connection has been established successfully."
        );
        const redisClient = await initializeRedisClient();
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

        app.listen(port, host, () => {
            console.log(
                `⚡️[server]: Server is running at http://${host}:${port}`
            );
        });
    } catch (error) {
        console.log("😥", error);
    }
};

startServer();
export { app };
