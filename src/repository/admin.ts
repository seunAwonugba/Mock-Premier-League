import Admin from "../models/admin";

export class AdminRepository {
    async createAdmin(admin: Admin) {
        const createAdmin = await Admin.create(admin);
        return createAdmin;
    }
    async getAdminByEmail(email: string) {
        const getAdminByEmail = await Admin.findOne({
            where: {
                email,
            },
        });
        return getAdminByEmail;
    }
}
