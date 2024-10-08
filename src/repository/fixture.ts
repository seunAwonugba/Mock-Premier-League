import Fixture from "../models/fixture";

export class FixtureRepository {
    async createFixture(fixture: Fixture) {
        const createTeam = await Fixture.create(fixture);
        return createTeam;
    }
    async getFixtures() {
        const getFixtures = await Fixture.findAll();
        return getFixtures;
    }
    async getFixturesByStatus(status: string) {
        const fixtures = await Fixture.findAll({
            where: {
                status,
            },
        });
        return fixtures;
    }
    async getFixture(fixtureId: string) {
        const getTeams = await Fixture.findOne({
            where: {
                fixtureId,
            },
        });
        return getTeams;
    }
    async deleteFixture(fixtureId: string) {
        const deleteTeam = await Fixture.destroy({
            where: {
                fixtureId,
            },
        });
        return deleteTeam;
    }

    async updateFixture(fixtureId: string, data: any) {
        const [affectedRowsCount, [updatedRecord]] = await Fixture.update(
            {
                ...data,
            },
            {
                where: {
                    fixtureId,
                },
                returning: true,
                validate: true,
            }
        );

        if (affectedRowsCount > 0 && updatedRecord) {
            return updatedRecord;
        }
    }
}
