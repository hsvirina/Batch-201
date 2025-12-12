import { Controller, Get, Post, Delete, Param, Body, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { CartService } from './cart.service.js';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard.js';
import { Request } from 'express';

interface AuthRequest extends Request {
  user: { sub: number };
}

@Controller('user/cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Req() req: AuthRequest) {
    return this.cartService.list(req.user.sub);
  }

  @Post(':wineId')
  addToCart(
    @Req() req: AuthRequest,
    @Param('wineId') wineId: string,
    @Body('quantity') quantity: number,
  ) {
    const id = Number(wineId);
    if (isNaN(id)) throw new BadRequestException('Invalid wine ID');

    if (!quantity || quantity < 1) {
      throw new BadRequestException('Quantity must be >= 1');
    }

    return this.cartService.add(req.user.sub, id, quantity);
  }

  @Delete(':wineId')
  removeFromCart(@Req() req: AuthRequest, @Param('wineId') wineId: string) {
    const id = Number(wineId);
    if (isNaN(id)) throw new BadRequestException('Invalid wine ID');

    return this.cartService.remove(req.user.sub, id);
  }
}
