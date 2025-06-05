"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRoute = void 0;
// 1. All required import
const express_1 = __importDefault(require("express"));
const likes_1 = require("../controllers/likes");
const Like_1 = require("../middlewares/create_privatecrud_setids/Like");
const Authorize_1 = require("../middlewares/Authorize");
const likes_2 = require("../utils/subvalidators/likes");
// 2. HTTP Method and Endpoint and Permissions
// general
exports.likeRoute = express_1.default.Router({
    mergeParams: true,
});
exports.likeRoute
    .route("/")
    .get(Like_1.filterLikes, likes_1.getAllLike)
    .post(likes_2.createOneLikeValidator, Authorize_1.verifyAuthentication, Authorize_1.verifyActivity, (0, Authorize_1.allowedTo)("user"), Like_1.setUserIdProductId, likes_1.createOneLike);
exports.likeRoute
    .route("/userLikes")
    .get(Authorize_1.verifyAuthentication, Authorize_1.verifyActivity, (0, Authorize_1.allowedTo)("user"), Like_1.filterLikes, likes_1.getAllLike);
exports.likeRoute
    .route("/:id")
    .delete(Authorize_1.verifyAuthentication, Authorize_1.verifyActivity, (0, Authorize_1.allowedTo)("user"), likes_1.deleteOneLike);
exports.default = exports.likeRoute;
// private or related
// custom
// ! 3. Front
// general
// private or related
// custom
