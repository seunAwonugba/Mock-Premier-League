import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateAccessToken = (payload: any) => {
    return jwt.sign(payload, String(process.env.ACCESS_TOKEN_KEY), {
        expiresIn: Number(process.env.ACCESS_TOKEN_EX),
    });
};
export const generateRefreshToken = (payload: any) => {
    return jwt.sign(payload, String(process.env.REFRESH_TOKEN_KEY), {
        expiresIn: Number(process.env.REFRESH_TOKEN_EX),
    });
};
