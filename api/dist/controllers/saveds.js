"use strict";
// 1. All required import
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneSaved = exports.getAllSaved = exports.createOneSaved = void 0;
const Saved_1 = __importDefault(require("../models/Saved"));
const refactorcrud_1 = require("./refactorcrud");
// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD
// 3.
// 3.1 general
// createOneSaved
exports.createOneSaved = (0, refactorcrud_1.createOneHandler)(Saved_1.default);
// getAllSaved
exports.getAllSaved = (0, refactorcrud_1.getAllHandler)(Saved_1.default, "SavedModel");
// getOneSaved: There is no something called getOneSaved not logical
// updateOneSaved: There is no something called updateOneSaved or updateWishlist not logical just there is deleteSaved or deleteProduct From Wishlist
// deleteOneSaved
exports.deleteOneSaved = (0, refactorcrud_1.deleteOneHandler)(Saved_1.default);
// 3.2 private
// 3.3 custom
