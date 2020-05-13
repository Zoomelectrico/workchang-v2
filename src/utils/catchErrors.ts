import { Request, Response, NextFunction } from 'express';

function catchErrors(fn: Function) {
  return function (req: Request, res: Response, next: NextFunction) {
    return fn(req, res, next).catch(next);
  };
}

export default catchErrors;
