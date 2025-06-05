"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savedRoute = void 0;
// 1. All required import
const express_1 = __importDefault(require("express"));
const Saved_1 = require("../middlewares/create_privatecrud_setids/Saved");
const saveds_1 = require("../controllers/saveds");
const Authorize_1 = require("../middlewares/Authorize");
const saveds_2 = require("../utils/subvalidators/saveds");
// 2. HTTP Method and Endpoint and Permissions
// general
exports.savedRoute = express_1.default.Router({
    mergeParams: true,
});
exports.savedRoute.use(Authorize_1.verifyAuthentication, Authorize_1.verifyActivity, (0, Authorize_1.allowedTo)("user"));
exports.savedRoute
    .route("/")
    .post(saveds_2.createOneSavedValidator, Saved_1.setUserIdProductIdd, saveds_1.createOneSaved)
    .get(Saved_1.filterSaveds, saveds_1.getAllSaved);
exports.savedRoute.route("/:id").delete(saveds_2.deleteOneSavedValidator, saveds_1.deleteOneSaved);
exports.default = exports.savedRoute;
// private or related
// custom
// ! 3. Front
// general
// private or related
// custom
