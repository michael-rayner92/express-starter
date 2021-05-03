import express from "express";

const asyncHandler = (fn: express.RequestHandler) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
