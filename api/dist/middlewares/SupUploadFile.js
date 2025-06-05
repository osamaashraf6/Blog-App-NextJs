"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFieldsFile = exports.uploadSingleFile = void 0;
// All required import
const multer_1 = __importDefault(require("multer"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
// uploadOption middleware config
const uploadOption = () => {
    //  memoryStorage===
    const memoryStorage = multer_1.default.memoryStorage();
    // fileFilter===
    const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        }
        else {
            cb(new ApiError_1.default(400, "Not an image! Please upload only images"));
        }
    };
    // upload===
    const upload = (0, multer_1.default)({ storage: memoryStorage, fileFilter: fileFilter });
    return upload;
};
const uploadSingleFile = (fieldName) => uploadOption().single(fieldName);
exports.uploadSingleFile = uploadSingleFile;
const uploadFieldsFile = (fields) => uploadOption().fields(fields);
exports.uploadFieldsFile = uploadFieldsFile;
