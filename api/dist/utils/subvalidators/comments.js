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
exports.deleteOneCommentValidator = exports.updateOneCommentValidator = exports.getOneCommentValidator = exports.createOneCommentValidator = void 0;
const SupValidator_1 = __importDefault(require("../../middlewares/SupValidator"));
const express_validator_1 = require("express-validator");
const Post_1 = __importDefault(require("../../models/Post"));
const Comment_1 = __importDefault(require("../../models/Comment"));
// 2.
// createOneCommentValidator
exports.createOneCommentValidator = [
    (0, express_validator_1.check)("userId").isMongoId().withMessage("Invalid User Id !"),
    (0, express_validator_1.check)("postId")
        .isMongoId()
        .withMessage("Invalid Post Id !")
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield Post_1.default.findById(val);
        if (!post) {
            throw new Error("Post Not Found !");
        }
        return true;
    })),
    (0, express_validator_1.check)("comment")
        .notEmpty()
        .withMessage("comment required")
        .isLength({ min: 6, max: 200 })
        .withMessage("comment length must be between 6 & 200"),
    SupValidator_1.default,
];
// getOneCommentValidator
exports.getOneCommentValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid Comment Id !"),
    SupValidator_1.default,
];
// updateOneCommentValidator
exports.updateOneCommentValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid Comment Id !")
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const comment = yield Comment_1.default.findById(val);
        if (!comment) {
            throw new Error("The Comment Doesn Not Exist To Be Updated !");
        }
        return true;
    }))
        .custom((val_1, _a) => __awaiter(void 0, [val_1, _a], void 0, function* (val, { req }) {
        var _b;
        const comment = yield Comment_1.default.findById(val);
        if ((comment === null || comment === void 0 ? void 0 : comment.userId._id) !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id)) {
            throw new Error("You Can Only Update Your Comment !");
        }
        return true;
    })),
    (0, express_validator_1.check)("comment")
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage("comment length must be between 2 & 50"),
    SupValidator_1.default,
];
// deleteOneCommentValidator
exports.deleteOneCommentValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid Comment Id !")
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const comment = yield Comment_1.default.findById(val);
        if (!comment) {
            throw new Error("The Comment Doesn Not Exist To Be Deleted !");
        }
        return true;
    }))
        .custom((val_1, _a) => __awaiter(void 0, [val_1, _a], void 0, function* (val, { req }) {
        var _b;
        const comment = yield Comment_1.default.findById(val);
        if ((comment === null || comment === void 0 ? void 0 : comment.userId._id) !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id)) {
            throw new Error("You Can Only Delete Your Comment !");
        }
        return true;
    })),
    SupValidator_1.default,
];
