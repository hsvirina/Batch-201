import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { CartService } from './cart.service.js';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard.js';
import { AddToCartDto, CartItemResponseDto } from './dto/add-to-cart.dto.js';
import { Request } from 'express';

/**
 * Extended request interface with JWT payload.
 * `sub` represents the authenticated user's ID.
 */
interface AuthRequest extends Request {
  user: { sub: number };
}

/**
 * CartController
 *
 * Exposes REST endpoints for managing user's shopping cart.
 *
 * Responsibilities:
 * - Protect routes using JWT authentication
 * - Delegate business logic to CartService
 * - Return DTOs instead of raw database entities
 *
 * All endpoints are scoped to the authenticated user.
 */
@Controller('user/cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * GET /user/cart
   *
   * Returns all items in the authenticated user's cart.
   * Supports pagination at service level if needed.
   */
  @Get()
  async getCart(@Req() req: AuthRequest): Promise<CartItemResponseDto[]> {
    return this.cartService.list(req.user.sub);
  }

  /**
   * POST /user/cart/:wineId
   *
   * Adds a wine to the user's cart or updates its quantity.
   *
   * Notes:
   * - Idempotent: adding the same wine updates quantity.
   * - Request body is validated via AddToCartDto (quantity must be >= 1)
   * - Returns DTO for safe client consumption
   */
  @Post(':wineId')
  async addToCart(
    @Req() req: AuthRequest,
    @Param('wineId', ParseIntPipe) wineId: number,
    @Body() dto: AddToCartDto,
  ): Promise<CartItemResponseDto> {
    return this.cartService.add(req.user.sub, wineId, dto.quantity);
  }

  /**
   * DELETE /user/cart/:wineId
   *
   * Removes a wine from the user's cart.
   *
   * Notes:
   * - Safe to call even if the item does not exist
   * - Returns HTTP 204 (No Content) on success
   */
  @Delete(':wineId')
  @HttpCode(204)
  async removeFromCart(
    @Req() req: AuthRequest,
    @Param('wineId', ParseIntPipe) wineId: number,
  ) {
    await this.cartService.remove(req.user.sub, wineId);
  }
}
