import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { FixtureRepository } from "../repository/fixture";
import { FixtureService } from "../service/fixture";
import { fixture } from "../validator/fixture";
import { TeamRepository } from "../repository/team";

const fixtureRepository = new FixtureRepository();
const teamRepository = new TeamRepository();
const fixtureService = new FixtureService(fixtureRepository, teamRepository);

export const createFixture = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        const schema = await fixture.validateAsync(body);
        const payload = {
            schema,
        };

        const createFixture = await fixtureService.createFixture(payload);

        return res.status(StatusCodes.CREATED).json({
            statusCode: StatusCodes.CREATED,
            success: true,
            data: createFixture,
            message: ReasonPhrases.CREATED,
        });
    } catch (error) {
        next(error);
    }
};

export const getFixtures = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const getFixtures = await fixtureService.getFixtures();

        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            success: true,
            data: getFixtures,
            message: ReasonPhrases.OK,
        });
    } catch (error) {
        next(error);
    }
};

export const updateFixture = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        const { id } = req.params;
        const schema = await fixture.validateAsync(body);
        const payload = {
            schema,
            id,
        };

        const updateFixture = await fixtureService.updateFixture(payload);

        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            success: true,
            data: updateFixture,
            message: ReasonPhrases.OK,
        });
    } catch (error) {
        next(error);
    }
};

export const getFixture = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const getFixture = await fixtureService.getFixture(id);

        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            success: true,
            data: getFixture,
            message: ReasonPhrases.OK,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteFixture = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const deleteFixture = await fixtureService.deleteFixture(id);

        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            success: true,
            data: deleteFixture,
            message: ReasonPhrases.OK,
        });
    } catch (error) {
        next(error);
    }
};
