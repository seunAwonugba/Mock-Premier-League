import { beforeEach, describe, it, expect, afterAll } from "@jest/globals";
import sequelize from "../src/models";
import request from "supertest";
import { app } from "../src/app";
import { StatusCodes } from "http-status-codes";

beforeEach(async () => {
    try {
        await sequelize!.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});

afterAll(async () => {
    sequelize?.close();
});

describe("admin", () => {
    it("admin signup successful with all required payload available", async () => {
        const response = await request(app)
            .post("/api/v1/auth/admin/signup")
            .send({
                name: "Awonugba seun",
                email: "seunawonugba@gmail.com",
                password: "Chemistry500*",
                repeat_password: "Chemistry500*",
            });

        expect(response.statusCode).toBe(StatusCodes.CREATED);
    });
    it("admin signup unsuccessful with all required payload available because of unique email", async () => {
        const response = await request(app)
            .post("/api/v1/auth/admin/signup")
            .send({
                name: "Awonugba seun",
                email: "seunawonugba@gmail.com",
                password: "Chemistry500*",
                repeat_password: "Chemistry500*",
            });

        expect(response.statusCode).toBe(StatusCodes.CONFLICT);
    });
    it("admin login successful with correct credentials", async () => {
        const response = await request(app)
            .post("/api/v1/auth/admin/login")
            .send({
                email: "seunawonugba@gmail.com",
                password: "Chemistry500*",
            });

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.body.data.email).toBe("seunawonugba@gmail.com");
    });
    it("admin login unsuccessful with invalid credentials", async () => {
        const response = await request(app)
            .post("/api/v1/auth/admin/login")
            .send({
                email: "seunawonugbagmail.com",
                password: "Chemistry500",
            });

        expect(response.statusCode).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
    });
});
