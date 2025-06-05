"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResetToken = exports.createSignToken = void 0;
// 1. All required import
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// 2. CreateSignToken
const createSignToken = (payload, role) => {
    return jsonwebtoken_1.default.sign({ _id: payload, role }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_Expire,
    });
};
exports.createSignToken = createSignToken;
// 3. CreateResetToken
const createResetToken = (payload) => {
    return jsonwebtoken_1.default.sign({ _id: payload }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_RESET_EXPIRE,
    });
};
exports.createResetToken = createResetToken;
