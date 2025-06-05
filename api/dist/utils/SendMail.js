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
// 1. All required import
const nodemailer_1 = __importDefault(require("nodemailer"));
// 2. sendMail
const sendMail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    //
    // const image = `<img src="cid:image@nodemailer.com" alt="DRAM Code" width="350px" height="350px" style="display: block;margin: auto;">`;
    //
    const emailOptions = {
        from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USERNAME}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: `<div style="background-color:#F6F5F5;padding:2%;margin:2%"><h1>${options.subject}</h1><p>${options.message}</p></div>`,
        // attachments: [
        //   {
        //     filename: "logo.png",
        //     path: "./public/logo.png",
        //     cid: "cid:image@nodemailer.com",
        //   },
        // ],
    };
    //
    yield transporter.sendMail(emailOptions);
});
exports.default = sendMail;
