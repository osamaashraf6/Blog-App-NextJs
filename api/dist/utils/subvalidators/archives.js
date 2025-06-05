"use strict";
// 1. All required import
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
exports.deleteOneArchiveValidator = exports.createOneArchiveValidator = void 0;
const SupValidator_1 = __importDefault(require("../../middlewares/SupValidator"));
const express_validator_1 = require("express-validator");
const Post_1 = __importDefault(require("../../models/Post"));
const Archive_1 = __importDefault(require("../../models/Archive"));
// 2.
// createOneArchiveValidator
exports.createOneArchiveValidator = [
    (0, express_validator_1.check)("postId")
        .isMongoId()
        .withMessage("Invalid Post Id !")
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield Post_1.default.findById(val);
        if (!post) {
            throw new Error("The Post Not Found !");
        }
        const archive = yield Archive_1.default.findOne({ postId: val });
        if (archive) {
            throw new Error("The Post Has Been Archived Before  !");
        }
        return true;
    })),
    SupValidator_1.default,
];
// createOneArchiveValidator
// createOneArchiveValidator
// createOneArchiveValidator
exports.deleteOneArchiveValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid Archive Id !")
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const archive = yield Archive_1.default.findById(val);
        if (!archive) {
            throw new Error("The Archive Doesn Not Exist To Be Deleted !");
        }
        return true;
    })),
    SupValidator_1.default,
];
