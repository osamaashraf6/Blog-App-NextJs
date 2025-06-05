"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterArchives = exports.setUserIdProductId = void 0;
// To create one archive (تابع ل مستخدم معين)
// SetUserIdProductId
const setUserIdProductId = (req, res, next) => {
    var _a;
    if (!req.body.userId) {
        req.body.userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    }
    if (!req.body.postId) {
        req.body.postId = req.params.postId;
    }
    next();
};
exports.setUserIdProductId = setUserIdProductId;
// To get All Archives of user
const filterArchives = (req, res, next) => {
    var _a;
    let filterData = {};
    if ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) {
        filterData.userId = req.user._id.toString();
    }
    req.filterData = filterData;
    next();
};
exports.filterArchives = filterArchives;
