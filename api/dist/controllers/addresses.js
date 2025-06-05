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
exports.deleteOneAddressByUser = exports.getAllAddressByUser = exports.createOneAddressByUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD
// 3.
// 3.1 general
// 3.2 private
// createOneAddressByUser
exports.createOneAddressByUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield User_1.default.findByIdAndUpdate(req.user._id, { $addToSet: { address: req.body.address } }, { new: true });
    if (!document) {
        next(new ApiError_1.default(404, "Document Not Found !"));
    }
    res
        .status(200)
        .json({ length: document === null || document === void 0 ? void 0 : document.address.length, data: document === null || document === void 0 ? void 0 : document.address });
}));
// getAllAddressByUser
exports.getAllAddressByUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield User_1.default.findById(req.user._id);
    if (!document) {
        next(new ApiError_1.default(404, "Document Not Found !"));
    }
    res
        .status(200)
        .json({ length: document === null || document === void 0 ? void 0 : document.address.length, data: document === null || document === void 0 ? void 0 : document.address });
}));
// getOneAddressByUser
// updateOneAddressByUser
// deleteOneAddressByUser
exports.deleteOneAddressByUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield User_1.default.findByIdAndUpdate(req.user._id, { $pull: { address: { _id: req.params.addressId } } }, { new: true });
    if (!document) {
        next(new ApiError_1.default(404, "Document Not Found !"));
    }
    res.status(200).json("One Address Has Been Deleted Successfully");
}));
// 3.3 custom
