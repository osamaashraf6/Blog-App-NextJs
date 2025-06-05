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
exports.deleteOneHandler = exports.updateOneHandler = exports.getOneHandler = exports.getAllHandler = exports.createOneHandler = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const Features_1 = __importDefault(require("../utils/Features"));
// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD
// 3.
// 3.1 general
// createOneHandler
const createOneHandler = (model) => {
    return (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const document = yield model.create(req.body);
        if (!document) {
            return next(new ApiError_1.default(400, "Document Not Found !"));
        }
        res.status(200).json({ data: document });
    }));
};
exports.createOneHandler = createOneHandler;
// getAllHandler
const getAllHandler = (model, modelName) => {
    return (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let filterData = {};
        let searchLength = 0;
        if (req.filterData) {
            filterData = req.filterData;
        }
        if (req.query) {
            const searchResult = new Features_1.default(model.find(filterData), req.query)
                .filter()
                .search(modelName);
            const searchData = yield searchResult.mongooseQuery;
            searchLength = searchData.length;
        }
        //
        const documentsCount = searchLength || (yield model.find(filterData).countDocuments());
        const features = new Features_1.default(model.find(filterData), req.query)
            .filter()
            .sort()
            .limitFields()
            .search(modelName)
            .pagination(documentsCount);
        const { mongooseQuery, paginationResult } = features;
        const documents = yield mongooseQuery;
        if (!documents) {
            return next(new ApiError_1.default(404, "Documents Not Found!"));
        }
        res.status(200).json({
            length: documents.length,
            pagination: paginationResult,
            data: documents,
        });
    }));
};
exports.getAllHandler = getAllHandler;
// ! without features
// export const getAllHandler = <modelType>(model: mongoose.Model<any>) => {
//   return asyncHandler(
//     async (
//       req: express.Request,
//       res: express.Response,
//       next: express.NextFunction
//     ): Promise<any> => {
//       let filterData: any = {};
//       if (req.filterData) {
//         filterData = req.filterData;
//       }
//       const documents: modelType[] | null = await model.find(filterData);
//       if (!documents) {
//         return next(new ApiError(400, "Documents Not Found !"));
//       }
//       res.status(200).json({ data: documents });
//     }
//   );
// };
// !
// getOneHandler
const getOneHandler = (model, populateOptions) => {
    return (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let query = model.findById(req.params.id);
        if (populateOptions) {
            query = query.populate(populateOptions);
        }
        const document = yield query;
        if (!document) {
            return next(new ApiError_1.default(404, "Document Not Found!"));
        }
        res.status(200).json({ data: document });
    }));
};
exports.getOneHandler = getOneHandler;
// updateOneHandler
const updateOneHandler = (model) => {
    return (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const document = yield model.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!document) {
            return next(new ApiError_1.default(400, "Document Not Found !"));
        }
        res.status(200).json({ data: document });
    }));
};
exports.updateOneHandler = updateOneHandler;
// deleteOneHandler
const deleteOneHandler = (model) => {
    return (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const document = yield model.findByIdAndDelete(req.params.id);
        if (!document) {
            return next(new ApiError_1.default(400, "Document Not Found !"));
        }
        res.status(200).json("Document has been deleted successfully");
    }));
};
exports.deleteOneHandler = deleteOneHandler;
