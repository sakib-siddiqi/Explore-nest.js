import {
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
    logger.log('Verifying token', 'Verifying');
    const token: string = (req?.headers as any)?.authorization;
    if (!token) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Token not found.',
      });
    }
    const decode = await this.firebaseService.auth.verifyIdToken(token);
    logger.log(JSON.stringify(decode, null, 2));
    (req as any).user = decode;
    next();
  }
}
