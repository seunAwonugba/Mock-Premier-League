import { NextFunction, Request, Response } from "express";
import { AdminRepository } from "../repository/admin";
import { AuthService } from "../service/auth";
import { admin, login, user } from "../validator/auth";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { UserRepository } from "../repository/user";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
const adminRepository = new AdminRepository();
const userRepository = new UserRepository();
const authService = new AuthService(adminRepository, userRepository);

export const adminSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        const schema = await admin.validateAsync(body);
        const payload = {
            schema,
        };

        const adminSignup = await authService.adminSignup(payload);

        const tokenPayload = {
            adminId: adminSignup.adminId,
            name: adminSignup.name,
            email: adminSignup.email,
        };
        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);
        return res.status(StatusCodes.CREATED).json({
            statusCode: StatusCodes.CREATED,
            success: true,
            data: adminSignup,
            accessToken,
            refreshToken,
            message: ReasonPhrases.CREATED,
        });
    } catch (error) {
        next(error);
    }
};

export const adminLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        const schema = await login.validateAsync(body);
        const payload = {
            schema,
        };

        const adminLogin = await authService.adminLogin(payload);

        const tokenPayload = {
            adminId: adminLogin.adminId,
            name: adminLogin.name,
            email: adminLogin.email,
        };
        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            success: true,
            data: adminLogin,
            accessToken,
            refreshToken,
            message: ReasonPhrases.OK,
        });
    } catch (error) {
        next(error);
    }
};

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        const schema = await user.validateAsync(body);
        const payload = {
            schema,
        };

        const userSignup = await authService.userSignup(payload);

        const tokenPayload = {
            userId: userSignup.userId,
            firstName: userSignup.firstName,
            lastName: userSignup.lastName,
            email: userSignup.email,
        };
        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);
        return res.status(StatusCodes.CREATED).json({
            statusCode: StatusCodes.CREATED,
            success: true,
            data: userSignup,
            accessToken,
            refreshToken,
            message: ReasonPhrases.CREATED,
        });
    } catch (error) {
        next(error);
    }
};

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        const schema = await login.validateAsync(body);
        const payload = {
            schema,
        };

        const userLogin = await authService.userLogin(payload);

        const tokenPayload = {
            userId: userLogin.userId,
            firstName: userLogin.firstName,
            lastName: userLogin.lastName,
            email: userLogin.email,
        };
        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);
        return res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            success: true,
            data: userLogin,
            accessToken,
            refreshToken,
            message: ReasonPhrases.OK,
        });
    } catch (error) {
        next(error);
    }
};
