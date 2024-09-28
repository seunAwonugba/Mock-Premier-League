import express from "express";
import { getFixturesUsingUniqueLink } from "../controller/fixture";

const unique = express.Router();

unique.get("/:code", getFixturesUsingUniqueLink);

export { unique };
