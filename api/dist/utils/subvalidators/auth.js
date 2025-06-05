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
exports.resetPasswordValidator = exports.forgetPasswordValidator = exports.loginValidator = exports.registerValidaor = void 0;
const SupValidator_1 = __importDefault(require("../../middlewares/SupValidator"));
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../../models/User"));
// 2.
// registerValidaor
exports.registerValidaor = [
    (0, express_validator_1.check)("name")
        .notEmpty()
        .withMessage("user name required")
        .isLength({ min: 2, max: 50 })
        .withMessage("name length must be between 2 & 50"),
    (0, express_validator_1.check)("email")
        .notEmpty()
        .withMessage("Email is Required")
        .isEmail()
        .withMessage("Invalid Email")
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ email: val });
        if (user) {
            throw new Error("Email is already exist");
        }
        return true;
    })),
    (0, express_validator_1.check)("role")
        .optional()
        .custom((val, { req }) => {
        req.body.role = "user";
        return true;
    }),
    (0, express_validator_1.check)("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6, max: 20 })
        .withMessage("password length from 6 to 20 char")
        .custom((val, { req }) => {
        if (val !== req.body.confirmPassword) {
            throw new Error("password doesn't match");
        }
        return true;
    }),
    (0, express_validator_1.check)("confirmPassword")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6, max: 20 })
        .withMessage("password length from 6 to 20 char"),
    (0, express_validator_1.check)("phone")
        .optional()
        .isMobilePhone(["ar-EG"])
        .withMessage("invalid phone number"),
    SupValidator_1.default,
];
// loginValidator
exports.loginValidator = [
    (0, express_validator_1.check)("email")
        .notEmpty()
        .withMessage("Email is Required")
        .isEmail()
        .withMessage("Invalid Email"),
    (0, express_validator_1.check)("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6, max: 20 })
        .withMessage("password length from 6 to 20 char"),
    SupValidator_1.default,
];
// forgetPasswordValidator
exports.forgetPasswordValidator = [
    (0, express_validator_1.check)("email")
        .notEmpty()
        .withMessage("Email is Required")
        .isEmail()
        .withMessage("Invalid Email"),
    SupValidator_1.default,
];
// resetPasswordValidator
exports.resetPasswordValidator = [
    (0, express_validator_1.check)("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6, max: 20 })
        .withMessage("password length from 6 to 20 char")
        .custom((val, { req }) => {
        if (val !== req.body.confirmPassword) {
            throw new Error("password doesn't match");
        }
        return true;
    }),
    (0, express_validator_1.check)("confirmPassword")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6, max: 20 })
        .withMessage("password length from 6 to 20 char"),
    SupValidator_1.default,
];
