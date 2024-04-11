import app from './server.js';
import { resolveKpi } from './kpiResolver.js';

import { Request, Response } from 'express';

app.postAsync('/', async (req: Request, res: Response) => {
  const { statusCode, headers, body }: any = await resolveKpi(req.body);

  res
    .status(Number(statusCode))
    .set(headers)
    .json(body);
});

export default app;
