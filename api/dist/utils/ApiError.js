"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1. ApiError
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4")
            ? "API Request Error"
            : "Internal Server Error";
    }
}
exports.default = ApiError;
