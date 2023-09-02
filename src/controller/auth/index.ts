import { Request, Response, NextFunction } from "express";
import { CallbackReply, ErrorCodes } from "../../objects/reply";
import { StatusCodes } from "http-status-codes";

class authContoller {
  static userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const reply = new CallbackReply();

    try {
      reply.Data = [
        {
          msg: "OK data ...",
        },
      ];

      reply.ErrorCode = ErrorCodes.SUCCESS;

      res.status(StatusCodes.OK).send(reply);
      return;
    } catch (error) {
      if (error instanceof CallbackReply) {
        res.status(StatusCodes.OK).send(error);
        return;
      }
      reply.AddErrors((error as Error).message);
      res.status(StatusCodes.OK).send(reply);
      return;
    }
  };
}

export default authContoller;
