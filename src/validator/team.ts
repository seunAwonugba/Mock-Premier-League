import Joi from "joi";
import { TEAM_NAME_NOT_EMPTY, TEAM_NAME_REQUIRED } from "../constant/constants";

export const team = Joi.object({
    name: Joi.string().trim().required().messages({
        "any.required": TEAM_NAME_REQUIRED,
        "string.empty": TEAM_NAME_NOT_EMPTY,
    }),
});
