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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// 2. UserSchema
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, trim: true },
    phone: { type: String, trim: true, unique: true },
    address: [
        {
            street: { type: String, required: true, trim: true },
            city: { type: String, required: true, trim: true },
            state: { type: String, required: true, trim: true },
            postalCode: { type: String, required: true, trim: true },
        },
    ],
    profileImg: { type: String },
    active: { type: Boolean, default: true },
    role: { type: String, enum: ["manager", "admin", "user"], default: "user" },
    resetCode: { type: String },
    resetCodeVerify: { type: Boolean },
    resetCodeExpireTime: { type: Date },
    passwordChangedAt: { type: Date },
}, { timestamps: true });
// 3. (pre&post, statics, virtuals) CRUD
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            next();
        this.password = yield bcryptjs_1.default.hash(this.password, 13);
        next();
    });
});
exports.default = mongoose_1.default.model("UserModel", UserSchema);
