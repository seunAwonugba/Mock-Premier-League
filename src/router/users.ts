import express from "express";
import { rateLimitMiddleware } from "../middleware/rateLimit";
import { getTeams } from "../controller/team";
import { userAuth } from "../middleware/auth";
const users = express.Router();

users.use(rateLimitMiddleware());

users.get("/teams", userAuth, getTeams);
export { users };
