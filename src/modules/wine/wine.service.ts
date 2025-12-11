import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class WineService {
  private prisma = new PrismaClient();

  async getAllWines() {
    return this.prisma.wine.findMany();
  }
}
