import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FirebaseModule } from 'src/infrastructure/firebase/firebase.module';
import { AuthenticationMiddleware } from './middlewares/authentication/authentication.middleware';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';

@Module({
  imports: [FirebaseModule],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
