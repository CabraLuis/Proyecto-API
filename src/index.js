import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/games", async (req, res, next) => {
  const getGames = await prisma.game.findMany();
  res.send(getGames).status(200);
});

app.get("/games/:id", async (req, res, next) => {
  const getGame = await prisma.game.findUnique({
    where: { id: req.params.id },
  });
  res.send(getGame).status(200);
});

app.delete("/games/:id", async (req, res, next) => {
  const deleteGame = await prisma.game.delete({
    where: { id: req.params.id },
  });
  res.send(deleteGame).status(200);
});

app.post("/games", async (req, res, next) => {
  const createUser = await prisma.game.create({
    data: {
      title: "title",
      developer: "dev",
      distributor: "d",
      genre: "g",
      released: "r",
    },
  });
  res.send().status(200);
});

app.patch("/games/:id", async (req, res, next) => {
  const updateGame = await prisma.game.update({
    where: {
      id: req.params.id,
    },
    data: {
      title: "title",
      developer: "dev",
      distributor: "d",
      genre: "g",
      released: "r",
    },
  });
  res.send(updateGame).status(200);
});

app.use((req, res, next) => {
  res.status(404).send("URL not defined");
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(3000, (req, res) => {
  console.log("App listening on port 3000!");
});
