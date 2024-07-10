import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly firebaseService: FirebaseService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger('Authentication');
    try {
      logger.log('Verifying token', 'Verifying');
      const token: string = (req?.headers as any)?.authorization || 'asdf';
      if (!token) {
        throw new NotFoundException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Token not found.',
          },
          {
            cause: 'Token Not found.',
          },
        );
      }
      const decode = await this.firebaseService.auth.verifyIdToken(token);
      logger.log(JSON.stringify(decode, null, 2));
      (req as any).user = decode;
      next();
    } catch (error) {
      logger.error(`[${error.name}] : ${error.message}`);
      logger.error(error.stack);
      throw new HttpException(
        {
          status:
            HttpStatus[HttpStatus[error.status]] || HttpStatus.UNAUTHORIZED,
          message: error.message || 'Unauthorized! Login to get access.',
        },
        HttpStatus[HttpStatus[error.status]] || HttpStatus.UNAUTHORIZED,
        {
          cause: error.message,
        },
      );
      next();
    }
  }
}
