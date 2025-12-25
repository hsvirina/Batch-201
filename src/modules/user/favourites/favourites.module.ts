import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service.js';
import { FavouritesController } from './favourites.controller.js';
import { PrismaModule } from '../../../prisma/prisma.module.js';

/**
 * FavouritesModule:
 * - Encapsulates all logic related to user's favourite wines.
 * - Registers service and controller for managing favourites.
 * - Imports PrismaModule to access the database.
 * - Exports FavouritesService so other modules (like UserModule) can reuse it.
 */
@Module({
  imports: [PrismaModule],
  providers: [FavouritesService],
  controllers: [FavouritesController],
  exports: [FavouritesService],
})
export class FavouritesModule {}
