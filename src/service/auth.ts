import { WRONG_CREDENTIALS } from "../constant/constants";
import { BadRequest } from "../error";
import { compareHashData } from "../helper";
import { AdminRepository } from "../repository/admin";
import { UserRepository } from "../repository/user";
import { generateAccessToken, generateRefreshToken } from "../utils/token";

export class AuthService {
    constructor(
        private adminRepository: AdminRepository,
        private userRepository: UserRepository
    ) {}
    async adminSignup(payload: any) {
        const body = payload.schema;
        const signup = await this.adminRepository.createAdmin(body);
        return signup;
    }
    async userSignup(payload: any) {
        const body = payload.schema;
        const signup = await this.userRepository.createUser(body);
        return signup;
    }

    async adminLogin(payload: any) {
        const body = payload.schema;
        const email = body.email;
        const password = body.password;
        const admin = await this.adminRepository.getAdminByEmail(email);

        if (!admin) {
            throw new BadRequest(WRONG_CREDENTIALS);
        }

        const passwords = {
            input: password,
            password: admin.password,
        };        

        const comparePasswords = await compareHashData(passwords);

        if (!comparePasswords) {
            throw new BadRequest(WRONG_CREDENTIALS);
        }

        return admin;
    }

    async userLogin(payload: any) {
        const body = payload.schema;
        const email = body.email;
        const password = body.password;
        const user = await this.userRepository.getUserByEmail(email);

        if (!user) {
            throw new BadRequest(WRONG_CREDENTIALS);
        }

        const passwords = {
            input: password,
            password: user.password,
        };

        const comparePasswords = await compareHashData(passwords);

        if (!comparePasswords) {
            throw new BadRequest(WRONG_CREDENTIALS);
        }

        return user;
    }
}
