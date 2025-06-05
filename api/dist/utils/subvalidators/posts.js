"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOnePostValidator = exports.updateOnePostValidator = exports.getOnePostValidator = exports.createOnePostValidator = void 0;
const SupValidator_1 = __importDefault(require("../../middlewares/SupValidator"));
const express_validator_1 = require("express-validator");
const Post_1 = __importDefault(require("../../models/Post"));
// 2.
// createOnePostValidator
exports.createOnePostValidator = [
    (0, express_validator_1.check)("title")
        .notEmpty()
        .withMessage("Title Name Is Required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Title Name Must Be Between 3 And 50 Characters")
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const document = yield Post_1.default.findOne({ title: val });
        if (document) {
            throw new Error("Post Title Already Existed");
        }
        return true;
    })),
    SupValidator_1.default,
];
// getOnePostValidator
exports.getOnePostValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid Mongo Id"),
    SupValidator_1.default,
];
// updateOnePostValidator
exports.updateOnePostValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid Mongo Id"),
    (0, express_validator_1.check)("title")
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage("Title Name Must Be Between 3 And 50 Characters"),
    SupValidator_1.default,
];
// deleteOnePostValidator
exports.deleteOnePostValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid Mongo Id"),
    SupValidator_1.default,
];
