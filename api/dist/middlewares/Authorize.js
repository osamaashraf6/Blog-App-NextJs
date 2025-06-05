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
exports.allowedTo = exports.verifyActivity = exports.verifyAuthentication = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// 2.
// 2.1
// verifyAuthentication Middleware
exports.verifyAuthentication = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1 - get token
    let token = "";
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else {
        return next(new ApiError_1.default(401, "please login first"));
    }
    // 2 - decoded token
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
    // 3 - check if user still exists in db
    const user = yield User_1.default.findById(decodedToken._id);
    if (!user) {
        return next(new ApiError_1.default(404, "user not found"));
    }
    // 4 - check change password
    if (user.passwordChangedAt instanceof Date) {
        const changeTime = parseInt((user.passwordChangedAt.getTime() / 1000).toString());
        if (changeTime > decodedToken.iat) {
            return next(new ApiError_1.default(401, "please login again"));
        }
    }
    req.user = user;
    next();
}));
// 2.2
// verifyActivity Middleware
exports.verifyActivity = (0, express_async_handler_1.default)((req, res, next) => {
    if (!req.user.active) {
        return next(new ApiError_1.default(403, "You Are Not Active !"));
    }
    next();
});
// 2.3
// allowedTo Middleware
const allowedTo = (...roles) => {
    return (0, express_async_handler_1.default)((req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError_1.default(403, "You Are Not Allowed To Do That !"));
        }
        next();
    });
};
exports.allowedTo = allowedTo;
