"use strict";
// 1. All required import
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneArchive = exports.getAllArchive = exports.createOneArchive = void 0;
const Archive_1 = __importDefault(require("../models/Archive"));
const refactorcrud_1 = require("./refactorcrud");
// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD
// 3.
// 3.1 general
// createOneLike
exports.createOneArchive = (0, refactorcrud_1.createOneHandler)(Archive_1.default);
// getAllArchive
exports.getAllArchive = (0, refactorcrud_1.getAllHandler)(Archive_1.default, "ArchiveModel");
// getOneArchive: There is no something called getOneArchive not logical
// updateOneArchive: There is no something called updateOneArchive or updateWishlist not logical just there is deleteArchive or deleteProduct From Wishlist
// deleteOneArchive
exports.deleteOneArchive = (0, refactorcrud_1.deleteOneHandler)(Archive_1.default);
// 3.2 private
// 3.3 custom
