import Joi from "joi";
import {
    AWAY_TEAM_NOT_EMPTY,
    AWAY_TEAM_REQUIRED,
    HOME_TEAM_NOT_EMPTY,
    HOME_TEAM_REQUIRED,
} from "../constant/constants";

export const fixture = Joi.object({
    homeTeamId: Joi.string().trim().required().messages({
        "any.required": HOME_TEAM_REQUIRED,
        "string.empty": HOME_TEAM_NOT_EMPTY,
    }),
    awayTeamId: Joi.string().trim().required().messages({
        "any.required": AWAY_TEAM_REQUIRED,
        "string.empty": AWAY_TEAM_NOT_EMPTY,
    }),
    status: Joi.string().trim().allow(""),
});
