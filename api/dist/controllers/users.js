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
exports.changeUsersPasswordByManagerOnly = exports.updateUsersProfileByManagerOnly = exports.changeUserPasswordByUserHimSelf = exports.updateUserProfileByUserHimSelf = exports.deleteOneUser = exports.getOneUser = exports.getAllUser = exports.createOneUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const refactorcrud_1 = require("./refactorcrud");
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Token_1 = require("../utils/Token");
// 2. | (general)=>general | ("private:coll" with general, "private:doc")=>private | (custom, authentication, usercontroller)=>custom | (pre&post, statics, virtuals) | CRUD
// 3.
// 3.1 general
// createOneUser
exports.createOneUser = (0, refactorcrud_1.createOneHandler)(User_1.default);
// getAllUser
exports.getAllUser = (0, refactorcrud_1.getAllHandler)(User_1.default, "UserModel");
// getOneUser
exports.getOneUser = (0, refactorcrud_1.getOneHandler)(User_1.default);
// deleteOneUser
exports.deleteOneUser = (0, refactorcrud_1.deleteOneHandler)(User_1.default);
// 3.2 private
// 3.3 custom
// TODO: User
// updateUserProfileByUserHimSelf
exports.updateUserProfileByUserHimSelf = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield User_1.default.findByIdAndUpdate(req.user._id, {
        name: req.body.name,
        lastname: req.body.lastname,
        phone: req.body.phone,
        profileImg: req.body.profileImg,
    }, { new: true });
    res.status(200).json(document);
}));
// changePasswordByUserHimSelf
exports.changeUserPasswordByUserHimSelf = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield User_1.default.findByIdAndUpdate(req.user._id, {
        password: yield bcryptjs_1.default.hash(req.body.password, 13),
        passwordChangedAt: Date.now(),
    }, { new: true });
    const token = (0, Token_1.createSignToken)(document === null || document === void 0 ? void 0 : document._id, document === null || document === void 0 ? void 0 : document.role);
    res
        .status(200)
        .json({ token, message: "Password Has Been Changed By User !" });
}));
// TODO: Manager
// updateUsersProfileByManagerOnly
exports.updateUsersProfileByManagerOnly = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield User_1.default.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        lastname: req.body.lastname,
        phone: req.body.phone,
        profileImg: req.body.profileImg,
        active: req.body.active,
        role: req.body.role,
    }, { new: true });
    res.status(200).json(document);
}));
// changeUsersPasswordByManagerOnly
exports.changeUsersPasswordByManagerOnly = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield User_1.default.findByIdAndUpdate(req.params.id, {
        password: yield bcryptjs_1.default.hash(req.body.password, 13),
        passwordChangedAt: Date.now(),
    }, { new: true });
    res.status(200).json({ message: "Password Has Been Changed By Manager !" });
}));
