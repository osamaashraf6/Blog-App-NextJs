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
exports.deleteOneSavedValidator = exports.createOneSavedValidator = void 0;
const express_validator_1 = require("express-validator");
const SupValidator_1 = __importDefault(require("../../middlewares/SupValidator"));
const Post_1 = __importDefault(require("../../models/Post"));
const Saved_1 = __importDefault(require("../../models/Saved"));
// 2.
// createOneSavedValidator
exports.createOneSavedValidator = [
    (0, express_validator_1.check)("postId")
        .isMongoId()
        .withMessage("Invalid Post Id !")
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield Post_1.default.findById(val);
        if (!post) {
            throw new Error("The Post Not Found !");
        }
        const saved = yield Saved_1.default.findOne({ postId: val });
        if (saved) {
            throw new Error("The Post Has Been Saved Before  !");
        }
        return true;
    })),
    // check("userId").isMongoId().withMessage("Invalid User Id !"),
    SupValidator_1.default,
];
// getOneSavedValidator
// updateOneSavedValidator
// deleteOneSavedValidator
exports.deleteOneSavedValidator = [
    (0, express_validator_1.check)("id")
        .isMongoId()
        .withMessage("Invalid Saved Id !")
        .custom((val_1, _a) => __awaiter(void 0, [val_1, _a], void 0, function* (val, { req }) {
        var _b, _c;
        const saved = yield Saved_1.default.findById(val);
        if (!saved) {
            throw new Error("The Saved Doesn Not Exist To Be Deleted !");
        }
        if (((_b = saved === null || saved === void 0 ? void 0 : saved.userId) === null || _b === void 0 ? void 0 : _b.toString()) !== ((_c = req.user) === null || _c === void 0 ? void 0 : _c._id.toString())) {
            // console.log(req.user?._id.toString());
            // console.log(req.user?._id.toString());
            throw new Error("You Can Only Delete Your Saved !");
        }
        return true;
    })),
    SupValidator_1.default,
];
