import { beforeEach, describe, it, expect, afterAll } from "@jest/globals";
import sequelize from "../src/models";
import request from "supertest";
import { app } from "../src/app";
import { StatusCodes } from "http-status-codes";
import {} from "jest";

let adminAuthToken: any;
beforeEach(async () => {
    try {
        await sequelize!.authenticate();
        console.log("Connection has been established successfully.");

        const response = await request(app)
            .post("/api/v1/auth/admin/login")
            .send({
                email: "seunawonugba@gmail.com",
                password: "Chemistry500*",
            });
        adminAuthToken = response.body.accessToken;
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});

afterAll(async () => {
    sequelize?.close();
});

describe("team", () => {
    it("only admin creates team successfully", async () => {
        const response = await request(app)
            .post("/api/v1/team")
            .send({
                name: "team awonugba seun",
            })
            .set("Authorization", `Bearer ${adminAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.CREATED);
        expect(response.body.data.name).toBe("team awonugba seun");
    });
    it("create team unsuccessful for unauthorized user", async () => {
        const response = await request(app).post("/api/v1/team").send({
            name: "team awonugba seun",
        });

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
    it("public search teams api", async () => {
        const response = await request(app)
            .get("/api/v1/team")
            .query({ search: "fc" });

        expect(response.statusCode).toBe(StatusCodes.OK);
    });
    it("admin gets teams", async () => {
        const response = await request(app)
            .get("/api/v1/team")
            .set("Authorization", `Bearer ${adminAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.OK);
    });
});
