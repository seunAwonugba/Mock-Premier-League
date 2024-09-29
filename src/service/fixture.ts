import { nanoid } from "nanoid";
import {
    AWAY_TEAM_NOT_FOUND,
    COMPLETED,
    FIXTURE_NOT_FOUND,
    HOME_TEAM_NOT_FOUND,
    INVALID_LINK,
    SAME_TEAM,
} from "../constant/constants";
import { BadRequest } from "../error";
import { FixtureRepository } from "../repository/fixture";
import { TeamRepository } from "../repository/team";
import { UrlRepository } from "../repository/url";
import { QueryObjectInterface } from "../helper/buildQueryObject";
import { longTermCache } from "../redis";

export class FixtureService {
    constructor(
        private fixtureRepository: FixtureRepository,
        private teamRepository: TeamRepository,
        private urlRepository: UrlRepository
    ) {}
    async createFixture(payload: any) {
        const body = payload.schema;

        const homeTeamId = body.homeTeamId;
        const awayTeamId = body.awayTeamId;

        if (homeTeamId == awayTeamId) {
            throw new BadRequest(SAME_TEAM);
        }

        const homeTeam = await this.teamRepository.getTeam(homeTeamId);
        if (!homeTeam) {
            throw new BadRequest(HOME_TEAM_NOT_FOUND);
        }

        const awayTeam = await this.teamRepository.getTeam(awayTeamId);

        if (!awayTeam) {
            throw new BadRequest(AWAY_TEAM_NOT_FOUND);
        }

        const createFixture = await this.fixtureRepository.createFixture(body);
        return createFixture;
    }
    async updateFixture(payload: any) {
        const body = payload.schema;
        const fixtureId = payload.id;
        const getFixture = await this.getFixture(fixtureId);

        const homeTeamId = body.homeTeamId;
        const awayTeamId = body.awayTeamId;

        if (homeTeamId == awayTeamId) {
            throw new BadRequest(SAME_TEAM);
        }

        const homeTeam = await this.teamRepository.getTeam(homeTeamId);
        if (!homeTeam) {
            throw new BadRequest(HOME_TEAM_NOT_FOUND);
        }

        const awayTeam = await this.teamRepository.getTeam(awayTeamId);

        if (!awayTeam) {
            throw new BadRequest(AWAY_TEAM_NOT_FOUND);
        }

        const updateTeam = await this.fixtureRepository.updateFixture(
            getFixture?.fixtureId,
            body
        );
        return updateTeam;
    }
    async getFixtures(queryObjectInterface: QueryObjectInterface) {
        const getFixtures = await this.fixtureRepository.getFixtures();
        const fixtures = await Promise.all(
            getFixtures.map(async (fixture) => {
                const homeTeamId = fixture.homeTeamId;
                const awayTeamId = fixture.awayTeamId;

                const homeTeam = await this.teamRepository.getTeam(homeTeamId);

                const awayTeam = await this.teamRepository.getTeam(awayTeamId);

                return {
                    fixture,
                    homeTeam,
                    awayTeam,
                };
            })
        );

        if (queryObjectInterface.search) {
            const searchQuery = queryObjectInterface.search.toLowerCase();
            return fixtures.filter(
                (fixtureData) =>
                    fixtureData.homeTeam?.name
                        .toLowerCase()
                        .includes(searchQuery) ||
                    fixtureData.awayTeam?.name
                        .toLowerCase()
                        .includes(searchQuery)
            );
        }
        return fixtures;
    }
    async getFixturesByStatus(status: string) {

        if (status == COMPLETED) {
            const fixtures = await longTermCache(status, async () => {
                const getFixtures =
                    await this.fixtureRepository.getFixturesByStatus(status);
                const fixtures = await Promise.all(
                    getFixtures.map(async (fixture) => {
                        const homeTeamId = fixture.homeTeamId;
                        const awayTeamId = fixture.awayTeamId;

                        const homeTeam = await this.teamRepository.getTeam(
                            homeTeamId
                        );

                        const awayTeam = await this.teamRepository.getTeam(
                            awayTeamId
                        );

                        return {
                            fixture,
                            homeTeam,
                            awayTeam,
                        };
                    })
                );
                return fixtures;
            });
            return fixtures;
        }
        const getFixtures = await this.fixtureRepository.getFixturesByStatus(
            status
        );
        const fixtures = await Promise.all(
            getFixtures.map(async (fixture) => {
                const homeTeamId = fixture.homeTeamId;
                const awayTeamId = fixture.awayTeamId;

                const homeTeam = await this.teamRepository.getTeam(homeTeamId);

                const awayTeam = await this.teamRepository.getTeam(awayTeamId);

                return {
                    fixture,
                    homeTeam,
                    awayTeam,
                };
            })
        );
        return fixtures;
    }
    async getFixture(fixtureId: string) {
        const getTeam = await this.fixtureRepository.getFixture(fixtureId);
        if (!getTeam) {
            throw new BadRequest(FIXTURE_NOT_FOUND);
        }
        return getTeam;
    }
    async deleteFixture(fixtureId: string) {
        const getFixture = await this.getFixture(fixtureId);

        const deleteFixture = await this.fixtureRepository.deleteFixture(
            getFixture.fixtureId
        );
        return deleteFixture;
    }
    async generateLink(fixtureId: string) {
        //check if fixture exist originally
        const getFixtureFromFixtureTable = await this.getFixture(fixtureId);

        //check if fixture exist on url db
        const getFixtureFromUrlTable =
            await this.urlRepository.getUrlByFixtureId(
                getFixtureFromFixtureTable.fixtureId
            );

        if (getFixtureFromUrlTable) {
            return getFixtureFromUrlTable.uniqueUrl;
        }
        const uniqueCode = nanoid(6);
        const originalUrl = `${process.env.BASE_URL}/fixture/${getFixtureFromFixtureTable.fixtureId}`;
        const uniqueUrl = `${process.env.BASE_URL}/unique/${uniqueCode}`;

        const urlPayload = {
            originalUrl,
            uniqueUrl,
            fixtureId: getFixtureFromFixtureTable.fixtureId,
            uniqueCode,
        };
        const createUrl = await this.urlRepository.createUrl(urlPayload);

        return uniqueUrl;
    }

    async getFixtureUsingUniqueCode(uniqueCode: string) {
        const getUrl = await this.urlRepository.getUrlByUniqueCode(uniqueCode);
        if (!getUrl) {
            throw new BadRequest(INVALID_LINK);
        }

        return getUrl;
    }
}
