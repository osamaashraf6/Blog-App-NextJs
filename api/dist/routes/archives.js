"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveRoute = void 0;
const archives_1 = require("./../utils/subvalidators/archives");
// 1. All required import
const express_1 = __importDefault(require("express"));
const archives_2 = require("../controllers/archives");
const Archive_1 = require("../middlewares/create_privatecrud_setids/Archive");
const Authorize_1 = require("../middlewares/Authorize");
// 2. HTTP Method and Endpoint and Permissions
// general
exports.archiveRoute = express_1.default.Router({
    mergeParams: true,
});
exports.archiveRoute.use(Authorize_1.verifyAuthentication, Authorize_1.verifyActivity, (0, Authorize_1.allowedTo)("user"));
exports.archiveRoute
    .route("/")
    .post(archives_1.createOneArchiveValidator, Archive_1.setUserIdProductId, archives_2.createOneArchive)
    .get(Archive_1.filterArchives, archives_2.getAllArchive);
exports.archiveRoute.route("/:id").delete(archives_1.deleteOneArchiveValidator, archives_2.deleteOneArchive);
exports.default = exports.archiveRoute;
// private or related
// custom
// ! 3. Front
// general
// private or related
// custom
