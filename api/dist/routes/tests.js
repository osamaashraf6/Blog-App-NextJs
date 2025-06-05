"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 1. All required import
const express_1 = __importDefault(require("express"));
const tests_1 = require("../controllers/tests");
// 2. HTTP Method and Endpoint and Permissions
// general
// private or related
// custom
const testRoute = express_1.default.Router();
testRoute.route("/").post(tests_1.createOneTest).get(tests_1.getAllTest);
testRoute.route("/:todoId").delete(tests_1.deleteOneTest);
exports.default = testRoute;
// ! 3. front
// general
// private or related
// custom
