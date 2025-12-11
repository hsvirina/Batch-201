import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  add(userId: number, wineId: number, quantity: number) {
    return this.prisma.cartItem.upsert({
      where: { userId_wineId: { userId, wineId } },
      update: { quantity },
      create: { userId, wineId, quantity },
    });
  }

  remove(userId: number, wineId: number) {
    return this.prisma.cartItem.deleteMany({
      where: { userId, wineId },
    });
  }

  list(userId: number) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: { wine: true },
    });
  }
}
