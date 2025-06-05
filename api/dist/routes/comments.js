"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoute = void 0;
// 1. All required import
const express_1 = __importDefault(require("express"));
const comments_1 = require("../controllers/comments");
const Comment_1 = require("../middlewares/create_privatecrud_setids/Comment");
const Authorize_1 = require("../middlewares/Authorize");
// 2. HTTP Method and Endpoint and Permissions
// general
exports.commentRoute = express_1.default.Router({
    mergeParams: true,
});
exports.commentRoute
    .route("/")
    .post(Authorize_1.verifyAuthentication, Authorize_1.verifyActivity, (0, Authorize_1.allowedTo)("user"), Comment_1.setUserIdProductId, comments_1.createOneComment)
    .get(Comment_1.filterComments, comments_1.getAllComment);
exports.commentRoute
    .route("/userComments")
    .get(Authorize_1.verifyAuthentication, Authorize_1.verifyActivity, (0, Authorize_1.allowedTo)("user"), Comment_1.filterComments, comments_1.getAllComment);
exports.commentRoute
    .route("/:id")
    .put(comments_1.updateOneComment)
    .delete(Authorize_1.verifyAuthentication, Authorize_1.verifyActivity, comments_1.deleteOneComment);
exports.default = exports.commentRoute;
// private or related
// custom
// ! 3. Front
// general
// private or related
// custom
