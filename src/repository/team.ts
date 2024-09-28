import { Op } from "sequelize";
import { QueryObjectInterface } from "../helper/buildQueryObject";
import Team from "../models/team";

export class TeamRepository {
    async createTeam(team: Team) {
        const createTeam = await Team.create(team);
        return createTeam;
    }
    async getTeams(queryObjectInterface: QueryObjectInterface) {
        console.log(queryObjectInterface);

        const { search } = queryObjectInterface;

        let whereClause: any = {};

        if (search) {
            whereClause = {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%` + search + `%`,
                        },
                    },
                ],
            };
        }

        const getTeams = await Team.findAll({
            where: whereClause,
        });
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
