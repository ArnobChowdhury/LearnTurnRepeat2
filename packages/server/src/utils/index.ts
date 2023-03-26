import path from "path";
import { promises as fsPromises } from "fs";
const { readFile } = fsPromises;

export const shouldBeReviewed = (
  reviewedTimes: number,
  lastReviewed: string
) => {
  if (reviewedTimes > 3) return false;

  const reviewRule: { [key: number]: number } = {
    1: 18 * 60 * 60 * 1000, // 18hrs
    2: 4 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000, // 4 days 18 hrs
    3: 90 * 24 * 60 * 60 * 1000, // 3 months
  };
  const timeNow = new Date().getTime();
  const lastReviewedAsMS = new Date(lastReviewed).getTime();

  return timeNow > lastReviewedAsMS + reviewRule[reviewedTimes];
};

export const getDB = async () => {
  const dbFilePath = path.resolve(__dirname, "..", "..", "db.json");
  const db = await readFile(dbFilePath);
  // @ts-ignore
  return JSON.parse(db);
};
