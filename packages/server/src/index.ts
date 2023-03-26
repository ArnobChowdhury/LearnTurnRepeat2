import { v4 as uuid } from "uuid";
import cors from "cors";
import { promises as fsPromises } from "fs";
import { shouldBeReviewed, getDB } from "./utils";
import express, { Request, Response } from "express";

const app = express();
const port = 5174;
app.use(express.json());
app.use(cors());

const { writeFile } = fsPromises;

app.post("/api/courses", async (req: Request, res: Response) => {
  const { courseName } = req.body;
  const db = await getDB();
  // @ts-ignore
  db[courseName] = [];
  await writeFile("./db.json", JSON.stringify(db));
  res.status(200).json({ message: "Done" });
});

app.get("/api/courses", async (req: Request, res: Response) => {
  // const courses = Object.keys(db);
  const db = await getDB();
  const courses = Object.keys(db);
  res.status(200).json({ courses });
});

app.post("/api/topic/:course", async (req: Request, res: Response) => {
  const { course } = req.params;
  const { topic: topicText } = req.body;
  const createdAt = new Date();

  const newTopic = {
    id: uuid(),
    createdAt,
    topic: topicText,
    lastReviewed: createdAt,
    reviewedTimes: 1,
  };

  const db = await getDB();
  // @ts-ignore
  db[course].push(newTopic);
  await writeFile("./db.json", JSON.stringify(db));

  res.status(200).json({ topic: newTopic });
});

app.get("/api/reviewables", async (_req: Request, res: Response) => {
  const reviewables: { [key: string]: any } = {};
  const db = await getDB();
  for (const course in db) {
    // @ts-ignore
    db[course].forEach((topic: any) => {
      console.log("Inside for each", topic);
      // @ts-ignore
      const { lastReviewed, reviewedTimes } = topic;

      if (shouldBeReviewed(reviewedTimes, lastReviewed)) {
        if (course in reviewables) reviewables[course].push(topic);
        else reviewables[course] = [topic];
      }
    });
  }

  res.status(200).json({ reviewables });
});

app.patch(
  "/api/reviewables/:course/:id",
  async (req: Request, res: Response) => {
    const { id, course } = req.params;
    const db = await getDB();
    // @ts-ignore
    const topic = db[course].find((topic) => topic.id === id);
    topic.reviewedTimes += 1;
    topic.lastReviewed = new Date();

    await writeFile("./db.json", JSON.stringify(db));
    res.status(201).json({ topic });
  }
);

app.listen(port, () => {
  console.log(`Express app listening on ${port}`);
});
