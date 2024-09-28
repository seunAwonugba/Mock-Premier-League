import express from "express";
import { adminAuth } from "../middleware/auth";
import {
    createFixture,
    deleteFixture,
    getFixture,
    getFixtures,
    updateFixture,
} from "../controller/fixture";

const fixture = express.Router();

fixture.post("/", adminAuth, createFixture);
fixture.get("/", getFixtures);
fixture.patch("/:id", adminAuth, updateFixture);
fixture.get("/:id", getFixture);
fixture.delete("/:id", adminAuth, deleteFixture);

export { fixture };
