// All required import
import express from "express";
import asyncHandler from "express-async-handler";
// import { uploadSingleFile } from "../../middelwares/SupUploadFile";
import { uploadSingleFile } from "../../middlewares/SupUploadFile";
import sharp from "sharp";

// uploadFieldsFile
export const uploadPostFile = uploadSingleFile("postImg");

// editFileWithBuffer
export const editFileWithBuffer = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    //

    if (req.file) {
      const imgName = `post-${Date.now()}.webp`;
      await sharp(req.file.buffer)
        .toFormat("webp")
        .webp({ quality: 95 })
        .toFile(`public/posts/${imgName}`);
      req.body.postImg = imgName;
    } 

    //
    next();
  }
);
