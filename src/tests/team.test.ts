import { beforeEach, describe, it, expect, afterAll } from "@jest/globals";
import sequelize from "../models";
import request from "supertest";
import { app } from "../app";
import { StatusCodes } from "http-status-codes";

let adminAuthToken: any;
let userAuthToken: any;
let teamId: any;
beforeEach(async () => {
    try {
        await sequelize!.authenticate();
        console.log("Connection has been established successfully.");

        const adminResponse = await request(app)
            .post("/api/v1/auth/admin/login")
            .send({
                email: "seunawonugba@gmail.com",
                password: "Chemistry500*",
            });
        adminAuthToken = adminResponse.body.accessToken;
        const userResponse = await request(app)
            .post("/api/v1/auth/user/login")
            .send({
                email: "seunawonugba@gmail.com",
                password: "Chemistry500*",
            });
        userAuthToken = userResponse.body.accessToken;
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

        teamId = response.body.data.teamId;
        expect(response.statusCode).toBe(StatusCodes.CREATED);
        expect(response.body.data.name).toBe("team awonugba seun");
    });
    it("user is unauthorized to create team", async () => {
        const response = await request(app)
            .post("/api/v1/team")
            .send({
                name: "team awonugba seun",
            })
            .set("Authorization", `Bearer ${userAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
    it("unauthorized user cant create team", async () => {
        const response = await request(app).post("/api/v1/team").send({
            name: "team awonugba seun",
        });

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
    it("only admin edits team successfully", async () => {
        const response = await request(app)
            .patch(`/api/v1/team/${teamId}`)
            .send({
                name: "team awonugba",
            })
            .set("Authorization", `Bearer ${adminAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.body.data.name).toBe("team awonugba");
    });
    it("user is unauthorized to edit team", async () => {
        const response = await request(app)
            .patch(`/api/v1/team/${teamId}`)
            .send({
                name: "team awonugba",
            })
            .set("Authorization", `Bearer ${userAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
    it("unauthorized user cant edit team", async () => {
        const response = await request(app)
            .patch(`/api/v1/team/${teamId}`)
            .send({
                name: "team awonugba",
            });

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
    it("only admin gets team successfully", async () => {
        const response = await request(app)
            .get(`/api/v1/team/${teamId}`)

            .set("Authorization", `Bearer ${adminAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.body.data.name).toBe("team awonugba");
    });
    it("only admin deletes team successfully", async () => {
        const response = await request(app)
            .delete(`/api/v1/team/${teamId}`)
            .set("Authorization", `Bearer ${adminAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.OK);
    });
    it("user is unauthorized to delete team", async () => {
        const response = await request(app)
            .delete(`/api/v1/team/${teamId}`)
            .set("Authorization", `Bearer ${userAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
    it("unauthorized user cannot delete a team", async () => {
        const response = await request(app).delete(`/api/v1/team/${teamId}`);

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
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
            .get("/api/v1/admin/teams")
            .set("Authorization", `Bearer ${adminAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.OK);
    });
    it("user gets teams", async () => {
        const response = await request(app)
            .get("/api/v1/users/teams")
            .set("Authorization", `Bearer ${userAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.OK);
    });
});
