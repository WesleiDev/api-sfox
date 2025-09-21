import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { DatabaseModule } from './common/database/database.module';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [
    AppConfigModule.forRoot(),
    DatabaseModule.forRoot(),
    UserModule,
    AuthModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
