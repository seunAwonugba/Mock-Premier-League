import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateAccessToken = (payload: any) => {
    if (payload.adminId) {
        return jwt.sign(payload, String(process.env.ADMIN_ACCESS_TOKEN_KEY), {
            expiresIn: Number(process.env.ACCESS_TOKEN_EX),
        });
    }
    return jwt.sign(payload, String(process.env.USER_ACCESS_TOKEN_KEY), {
        expiresIn: Number(process.env.ACCESS_TOKEN_EX),
    });
};
export const generateRefreshToken = (payload: any) => {
    if (payload.adminId) {
        return jwt.sign(payload, String(process.env.ADMIN_REFRESH_TOKEN_KEY), {
            expiresIn: Number(process.env.REFRESH_TOKEN_EX),
        });
    }
    return jwt.sign(payload, String(process.env.USER_REFRESH_TOKEN_KEY), {
        expiresIn: Number(process.env.REFRESH_TOKEN_EX),
    });
};
