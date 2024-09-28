"use strict";

import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { QueryInterface } from "sequelize";
import Team from "../models/team";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        const results: any = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, "../../src/teams.csv"))
                .pipe(csv())
                .on("data", (data) => {
                    results.push(data);
                })
                .on("end", () => {
                    Team.bulkCreate(results)
                        .then(() => {
                            resolve("Seed successful");
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
        });
    },

    async down(queryInterface: QueryInterface) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("teams", {}, {});
    },
};
