import {
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Param,
  Req,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { Request } from 'express';

import { FavouritesService } from './favourites.service.js';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard.js';
import { FavouriteDto } from './dto/favourite.dto.js';

/**
 * Extended request interface with JWT payload.
 * `sub` represents the authenticated user's ID.
 */
interface AuthRequest extends Request {
  user: { sub: number };
}

/**
 * FavouritesController
 *
 * Exposes REST endpoints for managing user's favourite wines.
 *
 * Responsibilities:
 * - Protect routes using JWT authentication
 * - Delegate business logic to FavouritesService
 * - Return DTOs instead of raw database entities
 *
 * All endpoints are scoped to the authenticated user.
 */
@Controller('user/favourites')
@UseGuards(JwtAuthGuard)
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  /**
   * GET /user/favourites
   *
   * Returns a list of favourite wines for the authenticated user.
   * The response contains only user-owned favourites.
   */
  @Get()
  async getFavourites(@Req() req: AuthRequest): Promise<FavouriteDto[]> {
    return this.favouritesService.list(req.user.sub);
  }

  /**
   * POST /user/favourites/:wineId
   *
   * Adds a wine to the user's favourites.
   *
   * Notes:
   * - The operation is idempotent
   * - Adding the same wine multiple times does not create duplicates
   * - Returns the newly added favourite as a DTO
   */
  @Post(':wineId')
  async addFavourite(
    @Req() req: AuthRequest,
    @Param('wineId', ParseIntPipe) wineId: number,
  ): Promise<FavouriteDto> {
    return this.favouritesService.add(req.user.sub, wineId);
  }

  /**
   * DELETE /user/favourites/:wineId
   *
   * Removes a wine from the user's favourites.
   *
   * Notes:
   * - Safe to call even if the wine is not in favourites
   * - Returns HTTP 204 (No Content) on success
   */
  @Delete(':wineId')
  @HttpCode(204)
  async removeFavourite(
    @Req() req: AuthRequest,
    @Param('wineId', ParseIntPipe) wineId: number,
  ): Promise<void> {
    await this.favouritesService.remove(req.user.sub, wineId);
  }
}
