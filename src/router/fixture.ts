import express from "express";
import { adminAuth, userAuth } from "../middleware/auth";
import {
    createFixture,
    deleteFixture,
    generateLink,
    getFixture,
    getFixtures,
    getFixturesByStatus,
    updateFixture,
} from "../controller/fixture";

const fixture = express.Router();

fixture.post("/", adminAuth, createFixture);
fixture.get("/", getFixtures);
fixture.post("/status", userAuth, getFixturesByStatus);
fixture.patch("/:id", adminAuth, updateFixture);
// fixture.get("/:id", getFixture);
fixture.get("/:id/admin", adminAuth, getFixture);
fixture.get("/:id/user", userAuth, getFixture);
fixture.get("/:id/link", adminAuth, generateLink);

fixture.delete("/:id", adminAuth, deleteFixture);

export { fixture };
