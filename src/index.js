import express from "express";
import { PrismaClient } from "@prisma/client";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

const app = express();
const prisma = new PrismaClient();

const swaggerJSDocOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Games API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    tags: [
      {
        name: "games",
        description: "Basic info of your games",
      },
    ],
    components: {
      schemas: {
        Game: {
          required: ["title", "developer", "distributor", "genre", "released"],
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "Galaga",
            },
            developer: {
              type: "string",
              example: "Namco",
            },
            distributor: {
              type: "string",
              example: "Namco",
            },
            genre: {
              type: "string",
              example: "Fixed Shooter",
            },
            released: {
              type: "string",
              example: "1981-09-25",
            },
          },
        },
      },
    },
  },
  apis: ["./src/index.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerJSDocOptions);
const theme = new SwaggerTheme();
const options = {
  customCss: theme.getBuffer(SwaggerThemeNameEnum.FEELING_BLUE),
};

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));
app.use(express.static("public"));

/**
 * @openapi
 * /games:
 *  get:
 *   tags:
 *    - games
 *   summary: Find all games
 *   description: Returns all games
 *   responses:
 *    200:
 *     description: Returns a JSON containing all registered games
 */
app.get("/games", async (req, res, next) => {
  const getGames = await prisma.game.findMany();
  res.send(getGames).status(200);
});

/**
 * @openapi
 * /games/{gameID}:
 *  get:
 *   tags:
 *    - games
 *   summary: Find a game by ID
 *   description: Returns a single game
 *   parameters:
 *    - name: gameID
 *      in: path
 *      description: ID of game to return
 *      required: true
 *      schema:
 *       type: integer
 *       format: int64
 *   responses:
 *    200:
 *     description: Returns a JSON object of the game
 */
app.get("/games/:id", async (req, res, next) => {
  const getGame = await prisma.game.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.send(getGame).status(200);
});

/**
 * @openapi
 * /games/{gameID}:
 *  delete:
 *   tags:
 *    - games
 *   summary: Delete a game by ID
 *   description: Deletes a  game
 *   parameters:
 *    - name: gameID
 *      in: path
 *      description: ID of game to delete
 *      required: true
 *      schema:
 *       type: integer
 *       format: int64
 *   responses:
 *    200:
 *     description: Returns a JSON object of the deleted game
 */
app.delete("/games/:id", async (req, res, next) => {
  const deleteGame = await prisma.game.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.send(deleteGame).status(200);
});

/**
 * @openapi
 * /games/{gameID}:
 *  post:
 *   tags:
 *    - games
 *   summary: Add a game
 *   description: Add a new game to the database
 *   requestBody:
 *    description: Create a new game
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Game'
 *   responses:
 *    200:
 *     description: Returns a JSON object of the game
 */
app.post("/games", async (req, res, next) => {
  const createUser = await prisma.game.create({
    data: {
      title: req.body.title,
      developer: req.body.developer,
      distributor: req.body.distributor,
      genre: req.body.genre,
      released: req.body.released,
    },
  });
  res.send().status(200);
});

app.patch("/games/:id", async (req, res, next) => {
  const updateGame = await prisma.game.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      title: req.body.title || undefined,
      developer: req.body.developer || undefined,
      distributor: req.body.distributor || undefined,
      genre: req.body.genre || undefined,
      released: req.body.released || undefined,
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
