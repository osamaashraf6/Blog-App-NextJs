"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserId = void 0;
// 2. setUserId
const setUserId = (req, res, next) => {
    if (req.user._id) {
        req.params.id = req.user._id.toString();
    }
    next();
};
exports.setUserId = setUserId;
