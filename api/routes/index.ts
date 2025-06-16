import { Application, Request, Response, NextFunction } from "express";

import addressRoute from "./addresses";
import archiveRoute from "./archives";
import authRoute from "./auth";
import commentRoute from "./comments";
import likeRoute from "./likes";
import postRoute from "./posts";
import savedRoute from "./saveds";
import testRoute from "./tests";
import userRoute from "./users";
import GlobalError from "../middlewares/GlobalError";
import ApiError from "../utils/ApiError";

const mountRoutes = (app: Application) => {
  app.use("/api/v1/addresses", addressRoute);
  app.use("/api/v1/archives", archiveRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/comments", commentRoute);
  app.use("/api/v1/likes", likeRoute);
  app.use("/api/v1/posts", postRoute);
  app.use("/api/v1/saveds", savedRoute);
  app.use("/api/v1/tests", testRoute);
  app.use("/api/v1/users", userRoute);



  app.use(GlobalError);
};

export default mountRoutes;
