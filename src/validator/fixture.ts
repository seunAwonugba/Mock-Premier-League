import Joi from "joi";
import {
    AWAY_TEAM_NOT_EMPTY,
    AWAY_TEAM_REQUIRED,
    FIXTURE_DATE_NOT_NULL,
    FIXTURE_DATE_REQUIRED,
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
    date: Joi.date().required().messages({
        "any.required": FIXTURE_DATE_REQUIRED,
        "string.empty": FIXTURE_DATE_NOT_NULL,
    }),
    status: Joi.string().trim().allow(""),
    homeTeamScore: Joi.string().trim().allow(""),
    awayTeamScore: Joi.string().trim().allow(""),
});

export const updateFixtureSchema = Joi.object({
    homeTeamId: Joi.string().trim().required().messages({
        "any.required": HOME_TEAM_REQUIRED,
        "string.empty": HOME_TEAM_NOT_EMPTY,
    }),
    awayTeamId: Joi.string().trim().required().messages({
        "any.required": AWAY_TEAM_REQUIRED,
        "string.empty": AWAY_TEAM_NOT_EMPTY,
    }),
    date: Joi.date().allow(""),
    status: Joi.string().trim().allow(""),
    homeTeamScore: Joi.string().trim().allow(""),
    awayTeamScore: Joi.string().trim().allow(""),
});
