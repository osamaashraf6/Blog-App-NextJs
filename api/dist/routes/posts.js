"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 1. All required import
const express_1 = __importDefault(require("express"));
const posts_1 = require("../controllers/posts");
const Authorize_1 = require("./../middlewares/Authorize");
const Post_1 = require("./../middlewares/create_privatecrud_setids/Post");
const Post_2 = require("../middlewares/create_privatecrud_setids/Post");
const archives_1 = __importDefault(require("./archives"));
const comments_1 = __importDefault(require("./comments"));
const likes_1 = __importDefault(require("./likes"));
const saveds_1 = __importDefault(require("./saveds"));
const posts_2 = require("../utils/subuploadfiles/posts");
// 2. HTTP Method and Endpoint and Permissions
// general
const postRoute = express_1.default.Router();
// postRoute.use(allowedTo("user"));
postRoute.use("/:postId/archives", archives_1.default);
postRoute.use("/:postId/comments", comments_1.default);
postRoute.use("/:postId/likes", likes_1.default);
postRoute.use("/:postId/saveds", saveds_1.default);
postRoute
    .route("/")
    .post(Authorize_1.verifyAuthentication, Authorize_1.verifyActivity, (0, Authorize_1.allowedTo)("user"), posts_2.uploadPostFile, posts_2.editFileWithBuffer, Post_2.setUserId, posts_1.createOnePost)
    .get(posts_1.getAllPost);
postRoute
    .route("/userPosts")
    .get(Authorize_1.verifyAuthentication, Authorize_1.verifyActivity, Post_1.filterPosts, posts_1.getAllPost);
postRoute
    .route("/:id")
    .get(posts_1.getOnePost)
    .put(Authorize_1.verifyAuthentication, Authorize_1.verifyActivity, posts_1.updateOnePost)
    .delete(Authorize_1.verifyAuthentication, Authorize_1.verifyActivity, posts_1.deleteOnePost);
// private or related
// custom
exports.default = postRoute;
// ! 3. front
// general
// private or related
// custom
