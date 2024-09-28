import express from "express";
import { adminAuth } from "../middleware/auth";
import {
    createTeam,
    deleteTeam,
    getTeam,
    getTeams,
    updateTeam,
} from "../controller/team";

const team = express.Router();

team.post("/", adminAuth, createTeam);
team.get("/", getTeams);
team.patch("/:id", adminAuth, updateTeam);
team.get("/:id", adminAuth, getTeam);
team.delete("/:id", adminAuth, deleteTeam);

export { team };
