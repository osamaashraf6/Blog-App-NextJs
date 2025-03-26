import asyncHandler from "express-async-handler";
import express from "express";
// 1. All required import

import { IPost } from "../interfaces/Post";
import Post from "../models/Post";
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
  getOneHandler,
  updateOneHandler,
} from "./refactorcrud";
import ApiError from "../utils/ApiError";

// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD

// 3.
// 3.1 general

// createOnePost
export const createOnePost = createOneHandler<IPost>(Post);
// getAllPost
export const getAllPost = getAllHandler<IPost>(Post, "PostModel");

// getOnePost
export const getOnePost = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } }, // Increment views by 1
      { new: true, runValidators: true } // Return updated document
    );

    if (!document) {
      return next(new ApiError(404, "Document Not Found!"));
    }

    res.status(200).json({ data: document });
  }
);

// export const getOnePost = getOneHandler<IPost>(Post);
// updateOnePost
export const updateOnePost = updateOneHandler<IPost>(Post);

// deleteOnePost
export const deleteOnePost = deleteOneHandler<IPost>(Post);

// 3.2 private

// 3.3 custom
