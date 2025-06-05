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
// 1. All required import
const mongoose_1 = __importDefault(require("mongoose"));
// 2. PostSchema
const PostSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, trim: true },
    briefDesc: { type: String, required: true, trim: true },
    detailedDesc: { type: String, required: true, trim: true },
    postImg: { type: String },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "UserModel" },
    category: { type: String, required: true, trim: true },
    tags: [String],
    views: { type: Number, required: true, default: 0 },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
PostSchema.virtual("saveds", {
    ref: "SavedModel",
    localField: "_id",
    foreignField: "postId",
});
// 3. (pre&post, statics, virtuals) CRUD
PostSchema.pre(/^find/, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({ path: "userId", select: "name profileImg" });
        next();
    });
});
exports.default = mongoose_1.default.model("PostModel", PostSchema);
