import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { CartItemResponseDto } from './dto/add-to-cart.dto.js';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  /**
   * Add a wine to the user's cart or update its quantity if it already exists.
   *
   * Notes:
   * - Idempotent: adding the same wine again updates quantity.
   * - Throws NotFoundException if wine does not exist.
   * - Throws BadRequestException if quantity < 1.
   * - Returns a DTO for safe client response.
   */
  async add(userId: number, wineId: number, quantity: number): Promise<CartItemResponseDto> {
    const wine = await this.prisma.wine.findUnique({ where: { id: wineId } });
    if (!wine) throw new NotFoundException('Wine not found');
    if (quantity < 1) throw new BadRequestException('Quantity must be >= 1');

    const cartItem = await this.prisma.cartItem.upsert({
      where: { userId_wineId: { userId, wineId } },
      update: { quantity },
      create: { userId, wineId, quantity },
      include: { wine: true },
    });

    return this.mapToDto(cartItem);
  }

  /**
   * Remove a wine from the user's cart.
   *
   * Notes:
   * - Safe to call even if the wine is not in the cart.
   * - Returns the number of deleted rows (could be 0).
   */
  async remove(userId: number, wineId: number) {
    return this.prisma.cartItem.deleteMany({ where: { userId, wineId } });
  }

  /**
   * List all items in the user's cart with pagination.
   *
   * Notes:
   * - Supports page and limit parameters for paging large carts.
   * - Includes related wine information.
   * - Returns an array of DTOs for safe client consumption.
   */
  async list(userId: number, page = 1, limit = 20): Promise<CartItemResponseDto[]> {
    const items = await this.prisma.cartItem.findMany({
      where: { userId },
      include: { wine: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    return items.map(this.mapToDto);
  }

  /**
   * Map a Prisma CartItem to a DTO.
   *
   * Notes:
   * - Exposes only safe fields.
   * - Converts Decimal price to string for consistent API output.
   */
  private mapToDto(item: any): CartItemResponseDto {
    const { wine } = item;
    return {
      wineId: wine.id,
      name: wine.name,
      quantity: item.quantity,
      vintage: wine.vintage,
      type: wine.type,
      color: wine.color,
      price: wine.price?.toString(),
      photoUrl: wine.photoUrl,
    };
  }
}