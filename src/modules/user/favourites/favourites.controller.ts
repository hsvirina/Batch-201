import { Controller, Get, Post, Delete, UseGuards, Param, Req } from '@nestjs/common';
import { FavouritesService } from './favourites.service.js';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard.js';

@Controller('user/favourites')
@UseGuards(JwtAuthGuard)
export class FavouritesController {
  constructor(private favouritesService: FavouritesService) {}

  @Get()
  getFavourites(@Req() req) {
    return this.favouritesService.list(req.user.sub);
  }

  @Post(':wineId')
  addFavourite(@Req() req, @Param('wineId') wineId: string) {
    return this.favouritesService.add(req.user.sub, +wineId);
  }

  @Delete(':wineId')
  removeFavourite(@Req() req, @Param('wineId') wineId: string) {
    return this.favouritesService.remove(req.user.sub, +wineId);
  }
}
