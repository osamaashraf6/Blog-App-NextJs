"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 1. All required import
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const User_1 = require("../middlewares/create_privatecrud_setids/User");
const Authorize_1 = require("../middlewares/Authorize");
const users_2 = require("../utils/subuploadfiles/users");
const users_3 = require("../utils/subvalidators/users");
// 2. HTTP Method and Endpoint and Permissions
const userRoute = express_1.default.Router();
userRoute.use(Authorize_1.verifyAuthentication, Authorize_1.verifyActivity);
// private or related
// custom
// TODO: User
userRoute
    .route("/getUserProfileByHimSelf")
    .get((0, Authorize_1.allowedTo)("user"), User_1.setUserId, users_1.getOneUser);
userRoute
    .route("/updateUserProfileByHimSelf")
    .put((0, Authorize_1.allowedTo)("user"), users_3.updateLoggedUserValidator, users_2.uploadUserFile, users_2.editFileWithBuffer, users_1.updateUserProfileByUserHimSelf);
userRoute
    .route("/changeUserPasswordByUserHimSelf")
    .put(users_3.changeLoggedUserPasswordValidator, users_1.changeUserPasswordByUserHimSelf);
userRoute
    .route("/deleteUserAccountByUserHimSelf")
    .delete((0, Authorize_1.allowedTo)("user"), users_3.deleteUserValidator, User_1.setUserId, users_1.deleteOneUser);
// general
userRoute
    .route("/")
    .post((0, Authorize_1.allowedTo)("manager"), users_1.createOneUser)
    .get((0, Authorize_1.allowedTo)("manager"), users_1.getAllUser);
userRoute
    .route("/:id")
    .get((0, Authorize_1.allowedTo)("manager"), users_1.getOneUser)
    .delete((0, Authorize_1.allowedTo)("manager"), users_1.deleteOneUser);
// TODO: Manager
userRoute
    .route("/:id")
    .put((0, Authorize_1.allowedTo)("manager"), users_1.updateUsersProfileByManagerOnly);
userRoute
    .route("/:id/changeUsersPasswordByManagerOnly")
    .put((0, Authorize_1.allowedTo)("manager"), users_1.changeUsersPasswordByManagerOnly);
exports.default = userRoute;
// ! 3. Front
// general
// private or related
// custom
