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
exports.deleteOneTest = exports.getAllTest = exports.createOneTest = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Test_1 = __importDefault(require("../models/Test"));
// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD
// 3.
// 3.1 general
// createOneTest
exports.createOneTest = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield Test_1.default.create(req.body);
    res.status(200).json(document);
}));
// getAllTest
exports.getAllTest = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield Test_1.default.find();
    res.status(200).json(document);
}));
// deleteOneTest
exports.deleteOneTest = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield Test_1.default.findByIdAndDelete(req.params.todoId);
    res.status(200).json("Test Has Been Deleted Successfully !");
}));
// 3.2 private
// 3.3 custom
