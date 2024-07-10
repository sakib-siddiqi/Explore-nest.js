import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger('HTTP');
    logger.log(
      `[${req.method}] ${req.baseUrl} - ${JSON.stringify(req.query || {})} - ${JSON.stringify(req.params)} `,
    );
    next();
  }
}
