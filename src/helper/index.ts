import bcryptjs from "bcryptjs";

export const compareHashData = async (data: any) => {
    try {
        const comparePassword = await bcryptjs.compare(
            data.input,
            data.password
        );
        return comparePassword;
    } catch (error) {
        return error;
    }
};
