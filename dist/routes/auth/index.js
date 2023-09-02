"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../controller/auth"));
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post('/signup', auth_1.default.userSignup);
