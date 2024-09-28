import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { TeamRepository } from "../repository/team";
import { TeamService } from "../service/team";
import { team } from "../validator/team";
const teamRepository = new TeamRepository();
const teamService = new TeamService(teamRepository);

export const createTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        const schema = await team.validateAsync(body);
        const payload = {
            schema,
        };

        const createTeam = await teamService.createTeam(payload);

        return res.status(StatusCodes.CREATED).json({
            statusCode: StatusCodes.CREATED,
            success: true,
            data: createTeam,
            message: ReasonPhrases.CREATED,
        });
    } catch (error) {
        next(error);
    }
};

export const getTeams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const getTeams = await teamService.getTeams();

        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            success: true,
            data: getTeams,
            message: ReasonPhrases.OK,
        });
    } catch (error) {
        next(error);
    }
};

export const updateTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        const { id } = req.params;
        const schema = await team.validateAsync(body);
        const payload = {
            schema,
            id,
        };

        const updateTeam = await teamService.updateTeam(payload);

        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            success: true,
            data: updateTeam,
            message: ReasonPhrases.OK,
        });
    } catch (error) {
        next(error);
    }
};

export const getTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {    
    try {
        const { id } = req.params;

        const getTeam = await teamService.getTeam(id);

        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            success: true,
            data: getTeam,
            message: ReasonPhrases.OK,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const deleteTeam = await teamService.deleteTeam(id);

        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            success: true,
            data: deleteTeam,
            message: ReasonPhrases.OK,
        });
    } catch (error) {
        next(error);
    }
};
