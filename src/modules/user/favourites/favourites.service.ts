import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Injectable()
export class FavouritesService {
  constructor(private readonly prisma: PrismaService) {}

  async add(userId: number, wineId: number) {
    return this.prisma.favourites.create({
      data: { userId, wineId },
    });
  }

  async remove(userId: number, wineId: number) {
    return this.prisma.favourites.deleteMany({
      where: { userId, wineId },
    });
  }

  async list(userId: number) {
    return this.prisma.favourites.findMany({
      where: { userId },
      include: { wine: true },
    });
  }
}
