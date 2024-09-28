import {
    AWAY_TEAM_NOT_FOUND,
    FIXTURE_NOT_FOUND,
    HOME_TEAM_NOT_FOUND,
    SAME_TEAM,
} from "../constant/constants";
import { BadRequest } from "../error";
import { FixtureRepository } from "../repository/fixture";
import { TeamRepository } from "../repository/team";

export class FixtureService {
    constructor(
        private fixtureRepository: FixtureRepository,
        private teamRepository: TeamRepository
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
    async getFixtures() {
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
}
