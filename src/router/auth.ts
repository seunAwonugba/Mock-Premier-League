import {
    adminLogin,
    adminSignup,
    userLogin,
    userSignup,
} from "../controller/auth";
import express from "express";

const auth = express.Router();

auth.post("/admin/signup", adminSignup);
auth.post("/admin/login", adminLogin);
auth.post("/user/signup", userSignup);
auth.post("/user/login", userLogin);

export { auth };
