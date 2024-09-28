import * as jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { Unauthenticated } from "../error";
import { AuthenticatedRequest, DecodedToken } from "../interface/DecodedToken";
import {
    AUTH_TOKEN_REQUIRED,
} from "../constant/constants";

export const adminAuth = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return next(new Unauthenticated(AUTH_TOKEN_REQUIRED));
    }

    const token = header.split(" ")[1];
    try {
        const decodedToken = <DecodedToken>(
            jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_KEY as string)
        );
        req["user"] = decodedToken;

        req.user = decodedToken;

        next();
    } catch (err: any) {
        next(err);
    }
};

export const userAuth = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return next(new Unauthenticated(AUTH_TOKEN_REQUIRED));
    }

    const token = header.split(" ")[1];
    try {
        const decodedToken = <DecodedToken>(
            jwt.verify(token, process.env.USER_ACCESS_TOKEN_KEY as string)
        );
        req["user"] = decodedToken;

        req.user = decodedToken;

        next();
    } catch (err: any) {
        next(err);
    }
};
