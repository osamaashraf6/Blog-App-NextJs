"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRoute = void 0;
// 1. All required import
const express_1 = __importDefault(require("express"));
const addresses_1 = require("../controllers/addresses");
const Authorize_1 = require("../middlewares/Authorize");
// 2. HTTP Method and Endpoint and Permissions
// general
// private or related
exports.addressRoute = express_1.default.Router();
exports.addressRoute.use(Authorize_1.verifyAuthentication, Authorize_1.verifyActivity, (0, Authorize_1.allowedTo)("user"));
exports.addressRoute.route("/").post(addresses_1.createOneAddressByUser).get(addresses_1.getAllAddressByUser);
exports.addressRoute.route("/:addressId").delete(addresses_1.deleteOneAddressByUser);
exports.default = exports.addressRoute;
// custom
// ! 3. Front
// general
// private or related
// custom
