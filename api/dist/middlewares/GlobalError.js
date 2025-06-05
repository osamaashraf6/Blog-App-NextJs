"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 2. GlobalError middleware
const GlobalError = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "Internal Server Error";
    if (process.env.NODE_ENV !== "production") {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
            stack: error.stack,
            error,
        });
    }
    else {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }
};
exports.default = GlobalError;
