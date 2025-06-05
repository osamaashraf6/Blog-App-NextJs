"use strict";
// 1. All required import
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneAddressByUserValidator = exports.createOneAddressByUserValidator = void 0;
const SupValidator_1 = __importDefault(require("../../middlewares/SupValidator"));
const express_validator_1 = require("express-validator");
// 2.
// createOneAddressByUserValidator
exports.createOneAddressByUserValidator = [
    (0, express_validator_1.check)("address").notEmpty().withMessage("Address Required !"),
    SupValidator_1.default,
];
// getOneAddressByUserValidator
// updateOneAddressByUserValidator
// deleteOneAddressByUserValidator
exports.deleteOneAddressByUserValidator = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid Address Id !"),
    SupValidator_1.default,
];
