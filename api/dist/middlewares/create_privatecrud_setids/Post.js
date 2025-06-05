"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPosts = exports.setUserId = void 0;
// 2. setUserId
const setUserId = (req, res, next) => {
    if (!req.body.userId) {
        req.body.userId = req.user._id.toString();
    }
    next();
};
exports.setUserId = setUserId;
const filterPosts = (req, res, next) => {
    let filterData = {};
    if (req.user._id) {
        filterData.userId = req.user._id.toString();
    }
    req.filterData = filterData;
    next();
};
exports.filterPosts = filterPosts;
