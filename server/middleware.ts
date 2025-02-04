
import { type Request, Response, NextFunction } from "express";

export async function trackApiUsage(req: Request, res: Response, next: NextFunction) {
  next();
}
