import express from "express";
import { rateLimitMiddleware } from "../middleware/rateLimit";
const users = express.Router();

users.use(rateLimitMiddleware());
export { users };
