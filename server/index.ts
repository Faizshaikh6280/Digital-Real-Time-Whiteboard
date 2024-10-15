import { createServer } from "http";
import express, { Request, Response } from "express";
import next from "next";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });

// Remove the NextApiHandler type here
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);

  // Handle all routes and pass to Next.js handler
  app.all("*", (req: Request, res: Response) => {
    return nextHandler(req, res);
  });

  server.listen(port, () => {
    console.log(`Server is ready and listening on port ${port}`);
  });
});
