import { Module } from '@nestjs/common';
import { WineModule } from './modules/wine/wine.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { UserModule } from './modules/user/user.module.js';

@Module({
  imports: [WineModule, AuthModule, UserModule],
})
export class AppModule {}
