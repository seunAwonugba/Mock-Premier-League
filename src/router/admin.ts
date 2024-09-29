import express from "express";
import { adminAuth } from "../middleware/auth";
import { getTeams } from "../controller/team";
const admin = express.Router();

admin.get("/teams", adminAuth, getTeams);

export { admin };
