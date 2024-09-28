import { CustomErrorHandler } from "../error";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { UNIQUE_ERROR, UNKNOWN_ERROR } from "../constant/constants";

export const error = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // console.log(err);

    if (err.isJoi == true) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
            success: false,
            message: err.details[0].message,
        });
    }

    if (err.name === UNIQUE_ERROR) {
        return res.status(StatusCodes.CONFLICT).json({
            statusCode: StatusCodes.CONFLICT,
            success: false,
            message: err.errors[0].message,
        });
    }

    if (err instanceof CustomErrorHandler) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            success: false,
            message: err.message,
        });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        data: err.message.split(":")[2] || UNKNOWN_ERROR,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
};
