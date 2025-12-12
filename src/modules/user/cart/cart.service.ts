import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async add(userId: number, wineId: number, quantity: number) {
    const wineExists = await this.prisma.wine.findUnique({
      where: { id: wineId },
    });

    if (!wineExists) {
      throw new BadRequestException('Wine with this ID does not exist');
    }

    if (!quantity || quantity < 1) {
      throw new BadRequestException('Quantity must be at least 1');
    }

    return this.prisma.cartItem.upsert({
      where: { userId_wineId: { userId, wineId } },
      update: { quantity },
      create: { userId, wineId, quantity },
    });
  }

  // ← Добавляем метод remove
  async remove(userId: number, wineId: number) {
    return this.prisma.cartItem.deleteMany({
      where: { userId, wineId },
    });
  }

  async list(userId: number) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: { wine: true },
    });
  }
}