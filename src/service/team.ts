import { TEAM_NOT_FOUND } from "../constant/constants";
import { BadRequest } from "../error";
import { QueryObjectInterface } from "../helper/buildQueryObject";
import { TeamRepository } from "../repository/team";

export class TeamService {
    constructor(private teamRepository: TeamRepository) {}
    async createTeam(payload: any) {
        const body = payload.schema;
        const createTeam = await this.teamRepository.createTeam(body);
        return createTeam;
    }
    async updateTeam(payload: any) {
        const body = payload.schema;
        const teamId = payload.id;
        const getTeam = await this.getTeam(teamId);

        const updateTeam = await this.teamRepository.updateTeam(
            getTeam?.teamId,
            body
        );
        return updateTeam;
    }
    async getTeams(queryObjectInterface: QueryObjectInterface) {
        const getTeams = await this.teamRepository.getTeams(queryObjectInterface);
        return getTeams;
    }
    async getTeam(teamId: string) {
        const getTeam = await this.teamRepository.getTeam(teamId);
        if (!getTeam) {
            throw new BadRequest(TEAM_NOT_FOUND);
        }
        return getTeam;
    }
    async deleteTeam(teamId: string) {
        const getTeam = await this.getTeam(teamId);

        const deleteTeam = await this.teamRepository.deleteTeam(getTeam.teamId);
        return deleteTeam;
    }
}
