import { closePool, initPool } from './utils/PostgresUtils.js';
import express, { NextFunction, Request, Response } from 'express';

const PORT = Number(process.env.PORT) || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize the Postgres pool
initPool();

// start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

function gracefulShutdown(eventName: string) {
  process.on(eventName, () => {

    console.log(`${eventName} signal received: closing server and connections`);

    closePool().then(() => {
      server.close((error: Error) => {
        if (error) {
          console.log(`Closed with error: ${error}`);
          process.exit(1);
        } else {
          process.exit(0);
        }
      });
    });
  });
}

// handle shutdown
gracefulShutdown('SIGINT');
gracefulShutdown('SIGTERM');

export const asyncWrapper = (asyncFn: (req: Request, res: Response) => Promise<void>) => {
  return function (req: Request, res: Response, next: NextFunction) {
    asyncFn(req, res).catch(next);
  };
};

export default {
  ...app,
  postAsync: (path: string, handler: (req: Request, res: Response) => Promise<void>) => app.post(path, asyncWrapper(handler)),
};
