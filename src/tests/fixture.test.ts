import { beforeEach, describe, it, expect, afterAll } from "@jest/globals";
import sequelize from "../models";
import request from "supertest";
import { app } from "../app";
import { StatusCodes } from "http-status-codes";
import { COMPLETED, PENDING } from "../constant/constants";

let adminAuthToken: any;
let userAuthToken: any;
let fixtureId: any;
let homeTeamId: any;
let awayTeamId: any;
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
        const teamsResponse = await request(app).get("/api/v1/team");

        homeTeamId = teamsResponse.body.data[0].teamId;
        awayTeamId = teamsResponse.body.data[1].teamId;
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});

afterAll(async () => {
    sequelize?.close();
});

describe("team", () => {
    it("only admin creates fixture successfully", async () => {
        const response = await request(app)
            .post("/api/v1/fixture")
            .send({
                homeTeamId,
                awayTeamId,
                date: new Date(),
            })
            .set("Authorization", `Bearer ${adminAuthToken}`); // Set the token in the Authorization header
        fixtureId = response.body.data.fixtureId;

        expect(response.statusCode).toBe(StatusCodes.CREATED);
    });
    it("user cannot create fixture", async () => {
        const response = await request(app)
            .post("/api/v1/fixture")
            .send({
                homeTeamId,
                awayTeamId,
                status: COMPLETED,
            })
            .set("Authorization", `Bearer ${userAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
    it("unauthorized user cannot create fixture", async () => {
        const response = await request(app).post("/api/v1/fixture").send({
            homeTeamId,
            awayTeamId,
            status: COMPLETED,
        });

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
    it("a single team cant face itself", async () => {
        const response = await request(app)
            .post("/api/v1/fixture")
            .send({
                homeTeamId,
                awayTeamId: homeTeamId,
                date: new Date(),
            })
            .set("Authorization", `Bearer ${adminAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
    it("only admin edits fixture successfully", async () => {
        const response = await request(app)
            .patch(`/api/v1/fixture/${fixtureId}`)
            .send({
                homeTeamId,
                awayTeamId,
                status: PENDING,
            })
            .set("Authorization", `Bearer ${adminAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.body.data.status).toBe(PENDING);
    });
    it("user is unauthorized to edit team", async () => {
        const response = await request(app)
            .patch(`/api/v1/fixture/${fixtureId}`)
            .send({
                homeTeamId,
                awayTeamId,
                status: PENDING,
            })
            .set("Authorization", `Bearer ${userAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
    it("unauthorized user cant edit team", async () => {
        const response = await request(app)
            .patch(`/api/v1/fixture/${fixtureId}`)
            .send({
                homeTeamId,
                awayTeamId,
                status: PENDING,
            });

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
    it("only admin deletes fixture successfully", async () => {
        const response = await request(app)
            .delete(`/api/v1/fixture/${fixtureId}`)

            .set("Authorization", `Bearer ${adminAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.body.data).toBe(1);
    });
    it("user is unauthorized to delete fixture", async () => {
        const response = await request(app)
            .delete(`/api/v1/fixture/${fixtureId}`)

            .set("Authorization", `Bearer ${userAuthToken}`); // Set the token in the Authorization header

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
    it("unauthorized user cant delete team", async () => {
        const response = await request(app).patch(
            `/api/v1/fixture/${fixtureId}`
        );

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
    it("get fixtures is public", async () => {
        const response = await request(app).get(`/api/v1/fixture`);

        expect(response.statusCode).toBe(StatusCodes.OK);
    });
    // it("only admin deletes team successfully", async () => {
    //     const response = await request(app)
    //         .delete(`/api/v1/team/${teamId}`)
    //         .set("Authorization", `Bearer ${adminAuthToken}`); // Set the token in the Authorization header

    //     expect(response.statusCode).toBe(StatusCodes.OK);
    // });
    // it("user is unauthorized to delete team", async () => {
    //     const response = await request(app)
    //         .delete(`/api/v1/team/${teamId}`)
    //         .set("Authorization", `Bearer ${userAuthToken}`); // Set the token in the Authorization header

    //     expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    // });
    // it("unauthorized user cannot delete a team", async () => {
    //     const response = await request(app).delete(`/api/v1/team/${teamId}`);

    //     expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    // });
    // it("create team unsuccessful for unauthorized user", async () => {
    //     const response = await request(app).post("/api/v1/team").send({
    //         name: "team awonugba seun",
    //     });

    //     expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    // });
    // it("public search teams api", async () => {
    //     const response = await request(app)
    //         .get("/api/v1/team")
    //         .query({ search: "fc" });

    //     expect(response.statusCode).toBe(StatusCodes.OK);
    // });
    // it("admin gets teams", async () => {
    //     const response = await request(app)
    //         .get("/api/v1/admin/teams")
    //         .set("Authorization", `Bearer ${adminAuthToken}`); // Set the token in the Authorization header

    //     expect(response.statusCode).toBe(StatusCodes.OK);
    // });
    // it("user gets teams", async () => {
    //     const response = await request(app)
    //         .get("/api/v1/users/teams")
    //         .set("Authorization", `Bearer ${userAuthToken}`); // Set the token in the Authorization header

    //     expect(response.statusCode).toBe(StatusCodes.OK);
    // });
});
