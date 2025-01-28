import { type Request, Response, NextFunction } from "express";

export async function trackApiUsage(req: Request, res: Response, next: NextFunction) {
  // Simply pass through the request
  next();
}