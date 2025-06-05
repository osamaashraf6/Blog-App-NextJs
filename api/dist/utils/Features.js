"use strict";
// 1. All required import
Object.defineProperty(exports, "__esModule", { value: true });
// 2. Features
class Features {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }
    filter() {
        const queryStringObj = Object.assign({}, this.queryString);
        const executedFields = [
            "page",
            "limit",
            "sort",
            "fields",
            "search",
        ];
        executedFields.forEach((field) => {
            delete queryStringObj[field];
        });
        let queryStr = JSON.stringify(queryStringObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        //
        const parsedQuery = JSON.parse(queryStr);
        // Build a query filter object
        const filterQuery = {};
        // Check if color is present and an array
        if (Array.isArray(parsedQuery.color) && parsedQuery.color.length > 0) {
            filterQuery.color = { $in: parsedQuery.color };
        }
        // Check if size is present and an array
        if (Array.isArray(parsedQuery.size) && parsedQuery.size.length > 0) {
            filterQuery.size = { $in: parsedQuery.size };
        }
        // Check if tags are present and an array
        if (Array.isArray(parsedQuery.tags) && parsedQuery.tags.length > 0) {
            filterQuery.tags = { $in: parsedQuery.tags };
        }
        // Merge the rest of the parsedQuery into the filter
        Object.assign(filterQuery, parsedQuery);
        // Now pass the constructed filter query to Mongoose
        this.mongooseQuery = this.mongooseQuery.find(filterQuery);
        return this;
    }
    search(modelName) {
        if (this.queryString.search) {
            let query = {};
            if (modelName === "products") {
                query.$or = [
                    { name: new RegExp(this.queryString.search, "i") },
                    { description: new RegExp(this.queryString.search, "i") },
                ];
            }
            else {
                query = { name: new RegExp(this.queryString.search, "i") };
            }
            this.mongooseQuery = this.mongooseQuery.find(query);
        }
        return this;
    }
    pagination(documentsCount) {
        const page = this.queryString.page || 1;
        const limit = this.queryString.limit || 5;
        const skip = (page - 1) * limit;
        const endIndex = page * limit;
        const pagination = {};
        pagination.currentPage = Number(page);
        pagination.totalPages = Math.ceil(documentsCount / limit);
        if (endIndex < documentsCount) {
            pagination.next = Number(page) + 1;
        }
        if (skip > 0) {
            pagination.prev = Number(page) - 1;
        }
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        this.paginationResult = pagination;
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        }
        else {
            this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
        }
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            // {
            //   name: new RegExp(this.queryString.search, "i");
            // }
            // const limit: string = this.queryString.fields.split(",").join(" ");
            const limit = new RegExp(this.queryString.fields.split(",").join(" "), "i");
            this.mongooseQuery = this.mongooseQuery.select(limit);
        }
        return this;
    }
}
exports.default = Features;
// Make the class structure [properties, constructor, methods]
// Add the property public paginationResult
// Add the constructor public mogooseQuery: , private queryString:
// Add the types for properties, constructor at interfaces=>Features[IPaginationQuery, IQueryString, ISearchQuery] then call them at class
// Add the content of methods
