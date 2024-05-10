import express from "express";
import { PrismaClient } from "@prisma/client";
import formidable from "formidable";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/games", async (req, res, next) => {
  const allGames = await prisma.game.findMany();
  res.send(allGames);
});

app.delete("/games", (req, res, next) => {
  res.send("si").status(200);
});

app.post("/games", (req, res, next) => {
  const form = formidable({
    uploadDir: "uploads",
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });
});

app.put("/games", (req, res, next) => {
  res.send("si").status(200);
});

app.listen(3000, (req, res) => {
  console.log("App listening on port 3000!");
});
