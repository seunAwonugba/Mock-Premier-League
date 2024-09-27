import "dotenv/config";
import express from "express";

const app = express();

const { PORT, HOST } = process.env;
const port = Number(PORT);
const host = String(HOST);

app.use(express.json());

app.listen(port, host, () => {
    console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
});
