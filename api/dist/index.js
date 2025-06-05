"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 1. All required import
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = require("./config");
const GlobalError_1 = __importDefault(require("./middlewares/GlobalError"));
const ApiError_1 = __importDefault(require("./utils/ApiError"));
// Imported Passport
// Imported Security
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const i18n_1 = require("i18n");
const path_1 = __importDefault(require("path"));
// Imported Routes same order of routes files
const addresses_1 = __importDefault(require("./routes/addresses"));
const archives_1 = __importDefault(require("./routes/archives"));
const auth_1 = __importDefault(require("./routes/auth"));
const comments_1 = __importDefault(require("./routes/comments"));
const likes_1 = __importDefault(require("./routes/likes"));
const posts_1 = __importDefault(require("./routes/posts"));
const saveds_1 = __importDefault(require("./routes/saveds"));
const tests_1 = __importDefault(require("./routes/tests"));
const users_1 = __importDefault(require("./routes/users"));
// 3. Middleware
config_1.app.use((0, cors_1.default)({
    origin: ["https://blog-app-next-js-j.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-CSRF-Token",
        "X-API-KEY",
    ],
    credentials: true,
}));
// app.use(cookieParser());
// app.use(
//   csurf({
//     cookie: {
//       httpOnly: true,
//       sameSite: "strict",
//     },
//   })
// );
config_1.app.use(express_1.default.json({ limit: "2kb" }));
config_1.app.use((0, compression_1.default)());
config_1.app.use((0, express_mongo_sanitize_1.default)());
config_1.app.use((0, hpp_1.default)({ whitelist: ["category"] }));
config_1.app.use((0, helmet_1.default)({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
const i18n = new i18n_1.I18n({
    locales: ["en", "ar"],
    directory: path_1.default.join(__dirname, "locales"),
    defaultLocale: "en",
    queryParameter: "lang",
});
config_1.app.use(i18n.init);
config_1.app.use(express_1.default.static("uploads"));
// http://localhost:5000/products/product-1726081638657-coverimg.webp if you want to open the img from the browser.
// 4. Passport
// 5. Routes
const mountRoutes = (app) => {
    // app.use(
    //   (
    //     req: express.Request,
    //     res: express.Response,
    //     next: express.NextFunction
    //   ) => {
    //     res.cookie("cookies", req.csrfToken());
    //     next();
    //   }
    // );
    app.use("/api/v1/addresses", addresses_1.default);
    app.use("/api/v1/archives", archives_1.default);
    app.use("/api/v1/auth", auth_1.default);
    app.use("/api/v1/comments", comments_1.default);
    app.use("/api/v1/likes", likes_1.default);
    app.use("/api/v1/posts", posts_1.default);
    app.use("/api/v1/saveds", saveds_1.default);
    app.use("/api/v1/tests", tests_1.default);
    app.use("/api/v1/users", users_1.default);
    app.all("**", (req, res, next) => {
        return next(new ApiError_1.default(400, `The Route ${req.originalUrl} Not Found !`));
    });
    app.use(GlobalError_1.default);
};
mountRoutes(config_1.app);
