import { Controller, Get, Post, Delete, UseGuards, Param, Req, BadRequestException } from '@nestjs/common';
import { FavouritesService } from './favourites.service.js';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard.js';
import { Request } from 'express';

interface AuthRequest extends Request {
  user: { sub: number };
}

@Controller('user/favourites')
@UseGuards(JwtAuthGuard)
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Get()
  getFavourites(@Req() req: AuthRequest) {
    return this.favouritesService.list(req.user.sub);
  }

  @Post(':wineId')
  addFavourite(@Req() req: AuthRequest, @Param('wineId') wineId: string) {
    const id = Number(wineId);
    if (isNaN(id)) throw new BadRequestException('Invalid wine ID');

    return this.favouritesService.add(req.user.sub, id);
  }

  @Delete(':wineId')
  removeFavourite(@Req() req: AuthRequest, @Param('wineId') wineId: string) {
    const id = Number(wineId);
    if (isNaN(id)) throw new BadRequestException('Invalid wine ID');

    return this.favouritesService.remove(req.user.sub, id);
  }
}
