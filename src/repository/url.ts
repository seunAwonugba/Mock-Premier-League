import Url from "../models/url";

export class UrlRepository {
    async createUrl(url: any) {
        const createUrl = await Url.create(url);
        return createUrl;
    }
    async getUrlByFixtureId(fixtureId: string) {
        const getUrl = await Url.findOne({
            where: {
                fixtureId,
            },
        });
        return getUrl;
    }
    async getUrlByUniqueCode(uniqueCode: string) {
        const getUrl = await Url.findOne({
            where: {
                uniqueCode,
            },
        });
        return getUrl;
    }
    // async getFixturesByStatus(status: string) {
    //     const fixtures = await Fixture.findAll({
    //         where: {
    //             status,
    //         },
    //     });
    //     return fixtures;
    // }
    // async getFixture(fixtureId: string) {
    //     const getTeams = await Fixture.findOne({
    //         where: {
    //             fixtureId,
    //         },
    //     });
    //     return getTeams;
    // }
    // async deleteFixture(fixtureId: string) {
    //     const deleteTeam = await Fixture.destroy({
    //         where: {
    //             fixtureId,
    //         },
    //     });
    //     return deleteTeam;
    // }

    // async updateFixture(fixtureId: string, data: any) {
    //     const [affectedRowsCount, [updatedRecord]] = await Fixture.update(
    //         {
    //             ...data,
    //         },
    //         {
    //             where: {
    //                 fixtureId,
    //             },
    //             returning: true,
    //             validate: true,
    //         }
    //     );

    //     if (affectedRowsCount > 0 && updatedRecord) {
    //         return updatedRecord;
    //     }
    // }
}
