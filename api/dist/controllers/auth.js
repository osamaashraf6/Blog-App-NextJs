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
exports.limitRequest = exports.resetPassword = exports.verifyResetCode = exports.forgetPassword = exports.login = exports.register = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const Token_1 = require("../utils/Token");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const SendMail_1 = __importDefault(require("../utils/SendMail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD
// 3.
// 3.1 general
// 3.2 private
// 3.3 custom
// register
exports.register = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield User_1.default.create(req.body);
    if (!document) {
        return next(new ApiError_1.default(400, "Document Not Found !"));
    }
    const token = (0, Token_1.createSignToken)(document._id, document.role);
    res.status(200).json({ token, data: document });
}));
// login
exports.login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return next(new ApiError_1.default(401, "Invalid Credentails !"));
    }
    const password = yield bcryptjs_1.default.compare(req.body.password, user.password);
    if (!password) {
        return next(new ApiError_1.default(401, "Invalid Credentails !"));
    }
    const token = (0, Token_1.createSignToken)(user._id, user.role);
    res.status(200).json({ token, data: user });
}));
// logout
// forgetPassword
exports.forgetPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. check if the email is existed
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return next(new ApiError_1.default(404, "User Not Found !"));
    }
    // 2. make the resetCode by random & hash it by crypto
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto_1.default
        .createHash("sha256")
        .update(resetCode)
        .digest("hex");
    // 3. assign and save the user.resetCode ... in the db
    user.resetCode = hashedResetCode;
    user.resetCodeVerify = false;
    user.resetCodeExpireTime = Date.now() + 10 * 60 * 1000;
    // 4. in try catch: send the resetcode to the SendMail() & save the user
    const message = `Your resetCode Is ${resetCode}`;
    try {
        yield (0, SendMail_1.default)({
            email: user.email,
            subject: "Reset Code For Forgetting Password ",
            message,
        });
        yield user.save({ validateModifiedOnly: true });
    }
    catch (err) {
        console.error(`message:${err.message} `);
        return next(new ApiError_1.default(400, "Error Sending Email !"));
    }
    // 5. after try catch make the CreateResetToken & send in res
    const token = (0, Token_1.createResetToken)(user._id);
    res
        .status(200)
        .json({ token, message: "Your resetCode Is Sent To Your Email" });
}));
// verifyResetCode
exports.verifyResetCode = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. check if there is a token in the headers
    let resetToken = "";
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        resetToken = req.headers.authorization.split(" ")[1];
    }
    else {
        return next(new ApiError_1.default(400, "Get Your Reset Code First !"));
    }
    // 2. verify the token by jwt
    const decodedToken = jsonwebtoken_1.default.verify(resetToken, process.env.JWT_KEY);
    // 3. hash the incoming resetCode by crypto
    const hashedResetCode = crypto_1.default
        .createHash("sha256")
        .update(req.body.resetCode)
        .digest("hex");
    // 4. find the user by the id & resetCode & expiretime
    const user = yield User_1.default.findOne({
        _id: decodedToken._id,
        resetCode: hashedResetCode,
        resetCodeExpireTime: { $gt: Date.now() },
    });
    // 5. check if there is user or not
    if (!user) {
        return next(new ApiError_1.default(400, "Invalid Or Expired Reset Code"));
    }
    // 6. make user.resetCodeVerify = true & save the user & res
    user.resetCodeVerify = true;
    yield user.save({ validateModifiedOnly: true });
    res.status(200).json({ message: "reset code verified" });
}));
//  verifyPersonalIdentity
// resetPassword
exports.resetPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. check if there is a token in the headers
    let resetToken = "";
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        resetToken = req.headers.authorization.split(" ")[1];
    }
    else {
        return next(new ApiError_1.default(400, "Get Your Reset Code First !"));
    }
    // 2. verify the token by jwt
    const decodedToken = jsonwebtoken_1.default.verify(resetToken, process.env.JWT_KEY);
    // 3. find the user by the id & resetCodeVerify
    const user = yield User_1.default.findOne({
        _id: decodedToken._id,
        resetCodeVerify: true,
    });
    // 4. check if there is user or not
    if (!user) {
        return next(new ApiError_1.default(400, "Verify Your Reset Code First !"));
    }
    // 5. make user.resetCodeVerify = true | user.resetCode = undefined | ... |  & save the user & res
    user.password = req.body.password;
    user.resetCode = undefined;
    user.resetCodeVerify = undefined;
    user.resetCodeExpireTime = undefined;
    user.passwordChangedAt = Date.now();
    yield user.save({ validateModifiedOnly: true });
    res.status(200).json({ message: "your password has been changed" });
}));
// refreshTokenForSession
// extendexpiretimeTokenOnRememberMe
// useremailautofillCredentialOnRememberMe
exports.limitRequest = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    limit: 20,
});
