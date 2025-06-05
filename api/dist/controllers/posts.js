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
exports.deleteOnePost = exports.updateOnePost = exports.getOnePost = exports.getAllPost = exports.createOnePost = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Post_1 = __importDefault(require("../models/Post"));
const refactorcrud_1 = require("./refactorcrud");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD
// 3.
// 3.1 general
// createOnePost
exports.createOnePost = (0, refactorcrud_1.createOneHandler)(Post_1.default);
// getAllPost
exports.getAllPost = (0, refactorcrud_1.getAllHandler)(Post_1.default, "PostModel");
// getOnePost
exports.getOnePost = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield Post_1.default.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, // Increment views by 1
    { new: true, runValidators: true } // Return updated document
    );
    if (!document) {
        return next(new ApiError_1.default(404, "Document Not Found!"));
    }
    res.status(200).json({ data: document });
}));
// export const getOnePost = getOneHandler<IPost>(Post);
// updateOnePost
exports.updateOnePost = (0, refactorcrud_1.updateOneHandler)(Post_1.default);
// deleteOnePost
exports.deleteOnePost = (0, refactorcrud_1.deleteOneHandler)(Post_1.default);
// 3.2 private
// 3.3 custom
