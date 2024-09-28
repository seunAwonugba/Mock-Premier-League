import Team from "../models/team";

export class TeamRepository {
    async createTeam(team: Team) {
        const createTeam = await Team.create(team);
        return createTeam;
    }
    async getTeams() {
        const getTeams = await Team.findAll();
        return getTeams;
    }
    async getTeam(teamId: string) {
        const getTeams = await Team.findOne({
            where: {
                teamId,
            },
        });
        return getTeams;
    }
    async deleteTeam(teamId: string) {
        const deleteTeam = await Team.destroy({
            where: {
                teamId,
            },
        });
        return deleteTeam;
    }

    async updateTeam(teamId: string, data: any) {
        const [affectedRowsCount, [updatedRecord]] = await Team.update(
            {
                ...data,
            },
            {
                where: {
                    teamId,
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
