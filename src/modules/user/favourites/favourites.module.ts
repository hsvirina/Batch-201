import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service.js';
import { FavouritesController } from './favourites.controller.js';
import { PrismaModule } from '../../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [FavouritesService],
  controllers: [FavouritesController],
  exports: [FavouritesService],
})
export class FavouritesModule {}
