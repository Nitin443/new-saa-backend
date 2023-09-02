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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const reply_1 = require("../../objects/reply");
const http_status_codes_1 = require("http-status-codes");
class authContoller {
}
_a = authContoller;
authContoller.userSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reply = new reply_1.CallbackReply();
    try {
        reply.Data = [
            {
                msg: "OK data ...",
            },
        ];
        reply.ErrorCode = reply_1.ErrorCodes.SUCCESS;
        res.status(http_status_codes_1.StatusCodes.OK).send(reply);
        return;
    }
    catch (error) {
        if (error instanceof reply_1.CallbackReply) {
            res.status(http_status_codes_1.StatusCodes.OK).send(error);
            return;
        }
        reply.AddErrors(error.message);
        res.status(http_status_codes_1.StatusCodes.OK).send(reply);
        return;
    }
});
exports.default = authContoller;
