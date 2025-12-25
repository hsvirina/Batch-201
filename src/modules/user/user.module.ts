import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { FavouritesModule } from './favourites/favourites.module.js';
import { CartModule } from './cart/cart.module.js';

/**
 * UserModule:
 * - Contains user domain logic
 * - Integrates persistence layer (Prisma)
 * - Composes related subdomains (Favourites, Cart)
 */
@Module({
  imports: [PrismaModule, FavouritesModule, CartModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
