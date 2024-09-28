import Joi from "joi";
import {
    CONFIRM_PASSWORD_REQUIRED,
    EMAIL_NOT_EMPTY,
    EMAIL_REQUIRED,
    EMPTY_CONFIRM_PASSWORD,
    FIRST_NAME_NOT_EMPTY,
    FIRST_NAME_REQUIRED,
    LAST_NAME_NOT_EMPTY,
    LAST_NAME_REQUIRED,
    MATCHING_PASSWORD,
    NAME_NOT_EMPTY,
    NAME_REQUIRED,
    PASSWORD_NOT_EMPTY,
    PASSWORD_REQUIRED,
    VALID_EMAIL,
    VALID_PASSWORD_LENGTH,
} from "../constant/constants";

export const admin = Joi.object({
    name: Joi.string().trim().required().messages({
        "any.required": NAME_REQUIRED,
        "string.empty": NAME_NOT_EMPTY,
    }),
    email: Joi.string().email().trim().required().messages({
        "string.email": VALID_EMAIL,
        "any.required": EMAIL_REQUIRED,
        "string.empty": EMAIL_NOT_EMPTY,
    }),
    password: Joi.string().trim().min(8).required().messages({
        "any.required": PASSWORD_REQUIRED,
        "string.min": VALID_PASSWORD_LENGTH,
        "string.empty": PASSWORD_NOT_EMPTY,
    }),
    repeat_password: Joi.any().valid(Joi.ref("password")).required().messages({
        "any.only": MATCHING_PASSWORD,
        "any.required": CONFIRM_PASSWORD_REQUIRED,
        "string.empty": EMPTY_CONFIRM_PASSWORD,
    }),
});

export const user = Joi.object({
    firstName: Joi.string().trim().required().messages({
        "any.required": FIRST_NAME_REQUIRED,
        "string.empty": FIRST_NAME_NOT_EMPTY,
    }),
    lastName: Joi.string().trim().required().messages({
        "any.required": LAST_NAME_REQUIRED,
        "string.empty": LAST_NAME_NOT_EMPTY,
    }),
    email: Joi.string().email().trim().required().messages({
        "string.email": VALID_EMAIL,
        "any.required": EMAIL_REQUIRED,
        "string.empty": EMAIL_NOT_EMPTY,
    }),
    password: Joi.string().trim().min(8).required().messages({
        "any.required": PASSWORD_REQUIRED,
        "string.min": VALID_PASSWORD_LENGTH,
        "string.empty": PASSWORD_NOT_EMPTY,
    }),
    repeat_password: Joi.any().valid(Joi.ref("password")).required().messages({
        "any.only": MATCHING_PASSWORD,
        "any.required": CONFIRM_PASSWORD_REQUIRED,
        "string.empty": EMPTY_CONFIRM_PASSWORD,
    }),
});

export const login = Joi.object({
    email: Joi.string().email().trim().required().messages({
        "string.email": VALID_EMAIL,
        "any.required": EMAIL_REQUIRED,
        "string.empty": EMAIL_NOT_EMPTY,
    }),
    password: Joi.string().trim().min(8).required().messages({
        "any.required": PASSWORD_REQUIRED,
        "string.min": VALID_PASSWORD_LENGTH,
        "string.empty": PASSWORD_NOT_EMPTY,
    }),
});
