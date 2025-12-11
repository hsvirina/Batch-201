import { Controller, Get, Post, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service.js';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard.js';

@Controller('user/cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Req() req) {
    return this.cartService.list(req.user.sub);
  }

  @Post(':wineId')
  addToCart(@Req() req, @Param('wineId') wineId: string, @Body('quantity') quantity: number) {
    return this.cartService.add(req.user.sub, +wineId, quantity);
  }

  @Delete(':wineId')
  removeFromCart(@Req() req, @Param('wineId') wineId: string) {
    return this.cartService.remove(req.user.sub, +wineId);
  }
}
