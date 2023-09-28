import express, { Request, Express, Response, NextFunction } from "express";
import { initPassport, authRoutes } from "./auth";
import { authenticateJWT } from "./middlewares/autMiddleware";

const app: Express = express();
const port = process.env.PORT ?? 4000;
app.use(express.urlencoded({ extended: false }));

// Boostrapping passport config
initPassport(app)

app.get("/ping", authenticateJWT,(req: Request, res: Response) => {
  res.status(200).json({
    message: 'pong'
  })
});

/**
 * * Auth routes
 */
app.use('/auth', authRoutes)

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
