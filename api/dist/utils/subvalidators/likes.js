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
exports.deleteOneLikeValidator = exports.createOneLikeValidator = void 0;
const express_validator_1 = require("express-validator");
const SupValidator_1 = __importDefault(require("../../middlewares/SupValidator"));
const Post_1 = __importDefault(require("../../models/Post"));
const Like_1 = __importDefault(require("../../models/Like"));
// 2.
// createOneLikeValidator
exports.createOneLikeValidator = [
    (0, express_validator_1.check)("postId")
        .isMongoId()
        .withMessage("Invalid Post Id !")
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield Post_1.default.findById(val);
        if (!post) {
            throw new Error("The Post Not Found !");
        }
        const like = yield Like_1.default.findOne({ postId: val });
        if (like) {
            throw new Error("The Post Has Been Liked Before  !");
        }
        return true;
    })),
    // check("userId").isMongoId().withMessage("Invalid User Id !"),
    SupValidator_1.default,
];
// getOneLikeValidator
// updateOneLikeValidator
// deleteOneLikeValidator
exports.deleteOneLikeValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid Like Id !")
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const like = yield Like_1.default.findById(val);
        if (!like) {
            throw new Error("The Like Doesn Not Exist To Be Deleted !");
        }
        return true;
    }))
        .custom((val_1, _a) => __awaiter(void 0, [val_1, _a], void 0, function* (val, { req }) {
        var _b;
        const like = yield Like_1.default.findById(val);
        if (like.userId._id !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id)) {
            throw new Error("You Can Only Delete Your Like !");
        }
        return true;
    })),
    SupValidator_1.default,
];
