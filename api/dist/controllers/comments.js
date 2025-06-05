"use strict";
// 1. All required import
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneComment = exports.updateOneComment = exports.getAllComment = exports.createOneComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const refactorcrud_1 = require("./refactorcrud");
// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD
// 3.
// 3.1 general
// createOneComment
exports.createOneComment = (0, refactorcrud_1.createOneHandler)(Comment_1.default);
// getAllComment
exports.getAllComment = (0, refactorcrud_1.getAllHandler)(Comment_1.default, "CommentModel");
// getOneComment: There is no something called getOneComment not logical
// updateOneComment
exports.updateOneComment = (0, refactorcrud_1.updateOneHandler)(Comment_1.default);
// deleteOneComment
exports.deleteOneComment = (0, refactorcrud_1.deleteOneHandler)(Comment_1.default);
// 3.2 private
// 3.3 custom
