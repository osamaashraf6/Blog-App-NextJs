"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// 1. All required import
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.app = (0, express_1.default)();
// 2. Config to connect to database
mongoose_1.default.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to database");
});
// 3. Config to connect to server
let server;
server = exports.app.listen(process.env.PORT, () => {
    console.log("connected to server");
});
process.on("unhandledRejection", (err) => {
    //
    console.error(`unhandledRejection Error: ${err.name} | ${err.message}`);
    //
    server.close(() => {
        console.error("Application is shutting down...");
        process.exit(1);
    });
    //
});
