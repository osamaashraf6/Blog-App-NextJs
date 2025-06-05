"use strict";
// 1. All required import
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneLike = exports.getAllLike = exports.createOneLike = void 0;
const Like_1 = __importDefault(require("../models/Like"));
const refactorcrud_1 = require("./refactorcrud");
// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD
// 3.
// 3.1 general
// createOneLike
exports.createOneLike = (0, refactorcrud_1.createOneHandler)(Like_1.default);
// getAllLike
exports.getAllLike = (0, refactorcrud_1.getAllHandler)(Like_1.default, "LikeModel");
// getOneLike: There is no something called getOneLike not logical
// updateOneLike: There is no something called updateOneLike or updateWishlist not logical just there is deleteLike or deleteProduct From Wishlist
// deleteOneLike
exports.deleteOneLike = (0, refactorcrud_1.deleteOneHandler)(Like_1.default);
// 3.2 private
// 3.3 custom
