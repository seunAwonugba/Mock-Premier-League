import User from "../models/user";

export class UserRepository {
    async createUser(user: User) {
        const createUser = await User.create(user);
        return createUser;
    }
    async getUserByEmail(email: string) {
        const getUserByEmail = await User.findOne({
            where: {
                email,
            },
        });
        return getUserByEmail;
    }
}
