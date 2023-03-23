import express, { Request, Response } from "express";

const app = express();
const port = 5174;
app.use(express.json());

app.post("/api/topic/:course", (req: Request, res: Response) => {
  const { course } = req.params;
  const { topics } = req.body;
  console.log(req.body);
  console.log(topics, course);
  res.status(200);
});

app.listen(port, () => {
  console.log(`Express app listening on ${port}`);
});
