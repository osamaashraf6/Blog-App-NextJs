"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 1. All required import
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_2 = require("../utils/subvalidators/auth");
// 2. HTTP Method and Endpoint and Permissions
const authRoute = express_1.default.Router();
// general
// private or related
// custom
authRoute.route("/register").post(auth_2.registerValidaor, auth_1.register);
authRoute.route("/login").post(auth_1.limitRequest, auth_1.login);
authRoute.route("/forgetPassword").post(auth_1.forgetPassword);
authRoute.route("/resetCodeVerify").post(auth_1.verifyResetCode);
authRoute.route("/resetPassword").post(auth_1.resetPassword);
exports.default = authRoute;
// ! 3. Front
// general
// private or related
// custom
