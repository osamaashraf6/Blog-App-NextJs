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
exports.editFileWithBuffer = exports.uploadUserFile = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// import { uploadSingleFile } from "../../middelwares/SupUploadFile";
const SupUploadFile_1 = require("../../middlewares/SupUploadFile");
const sharp_1 = __importDefault(require("sharp"));
// uploadFieldsFile
exports.uploadUserFile = (0, SupUploadFile_1.uploadSingleFile)("profileImg");
// editFileWithBuffer
exports.editFileWithBuffer = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //
    if (req.file) {
        const imgName = `user-${Date.now()}.webp`;
        yield (0, sharp_1.default)(req.file.buffer)
            .toFormat("webp")
            .webp({ quality: 95 })
            .toFile(`uploads/users/${imgName}`);
        req.body.profileImg = imgName;
    }
    //
    next();
}));
