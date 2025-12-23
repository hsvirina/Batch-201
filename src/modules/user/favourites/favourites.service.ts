import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { FavouriteDto } from './dto/favourite.dto.js';

/**
 * FavouritesService
 *
 * Handles user's favourite wines:
 * - adding to favourites
 * - removing from favourites
 * - listing favourite wines
 *
 * Ensures idempotent operations and returns safe DTOs
 * for API responses.
 */
@Injectable()
export class FavouritesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Adds a wine to user's favourites.
   *
   * - Validates that the wine exists
   * - Uses upsert to prevent duplicate favourites
   * - Returns full favourite data as DTO
   *
   * @param userId - ID of the authenticated user
   * @param wineId - ID of the wine to add
   * @throws NotFoundException if wine does not exist
   */
  async add(userId: number, wineId: number): Promise<FavouriteDto> {
    const wine = await this.prisma.wine.findUnique({ where: { id: wineId } });
    if (!wine) {
      throw new NotFoundException('Wine not found');
    }

    const favourite = await this.prisma.favourites.upsert({
      where: { userId_wineId: { userId, wineId } },
      update: {},
      create: { userId, wineId },
      include: { wine: true },
    });

    return this.mapToDto(favourite);
  }

  /**
   * Removes a wine from user's favourites.
   *
   * Uses deleteMany to ensure the operation
   * remains idempotent even if the favourite
   * does not exist.
   *
   * @param userId - ID of the authenticated user
   * @param wineId - ID of the wine to remove
   */
  async remove(userId: number, wineId: number) {
    return this.prisma.favourites.deleteMany({
      where: { userId, wineId },
    });
  }

  /**
   * Returns a paginated list of user's favourite wines.
   *
   * @param userId - ID of the authenticated user
   * @param page - Page number (1-based)
   * @param limit - Number of items per page
   */
  async list(
    userId: number,
    page = 1,
    limit = 20,
  ): Promise<FavouriteDto[]> {
    const favourites = await this.prisma.favourites.findMany({
      where: { userId },
      include: { wine: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    return favourites.map(this.mapToDto);
  }

  /**
   * Maps Favourite entity to FavouriteDto.
   *
   * Ensures that only required and safe wine fields
   * are exposed to API consumers.
   */
  private mapToDto(fav: any): FavouriteDto {
    const { wine } = fav;

    return {
      wineId: wine.id,
      name: wine.name,
      vintage: wine.vintage,
      type: wine.type,
      color: wine.color,
      price: wine.price?.toString(),
      photoUrl: wine.photoUrl,
    };
  }
}