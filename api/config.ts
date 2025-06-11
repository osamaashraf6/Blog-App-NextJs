import express, { Request } from "express";
import cors from "cors";
import compression from "compression";
import expressMongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import helmet from "helmet";
import { I18n } from "i18n";
import path from "path";
import mongoose from "mongoose";

declare module "express" {
  interface Request {
    user?: any;
    fields?: any;
    filterData?: any;
  }
}

export const app = express();

let isConnected = false;
async function connectToDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URL!);
  isConnected = true;
  console.log("Connected to database");
}
app.use(async (req, res, next) => {
  try {
    await connectToDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-CSRF-Token",
      "X-API-KEY",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "2kb" }));
app.use(compression());
app.use(expressMongoSanitize());
app.use(hpp({ whitelist: ["category"] }));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

const i18n = new I18n({
  locales: ["en", "ar"],
  directory: path.join(__dirname, "locales"),
  defaultLocale: "en",
  queryParameter: "lang",
});
app.use(i18n.init);

app.use(express.static("public"));
