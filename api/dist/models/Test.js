"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 1. All required import
const mongoose_1 = __importDefault(require("mongoose"));
// 2. TestSchema
const TestSchema = new mongoose_1.default.Schema({
    title: { type: String },
}, { timestamps: true });
exports.default = mongoose_1.default.model("TestModel", TestSchema);
// 3. (pre&post, statics, virtuals) CRUD
