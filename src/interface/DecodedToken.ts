import { Request } from "express";

export interface DecodedToken {
    email: string;
    name?: string;
    adminId?: string;
    userId?: string;
    firstName?: string;
    lastName?: string;
}

// Extend the Request type definition
export interface AuthenticatedRequest extends Request {
    user?: DecodedToken;
}
