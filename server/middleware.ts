
import { type Request, Response, NextFunction } from "express";
import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { apiUsage } from "../db/schema";

const DAILY_LIMIT = 1000;

export async function trackApiUsage(req: Request, res: Response, next: NextFunction) {
  if (!req.path.startsWith("/api/weather")) {
    return next();
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let usage = await db.select().from(apiUsage)
    .where(eq(sql`DATE(${apiUsage.date})`, sql`DATE(NOW())`))
    .limit(1);

  if (usage.length === 0) {
    await db.insert(apiUsage).values({ count: 1 });
  } else if (usage[0].count >= DAILY_LIMIT) {
    return res.status(429).json({ message: "API rate limit exceeded. Try again tomorrow." });
  } else {
    await db.update(apiUsage)
      .set({ count: sql`${apiUsage.count} + 1` })
      .where(eq(sql`DATE(${apiUsage.date})`, sql`DATE(NOW())`));
  }

  next();
}
