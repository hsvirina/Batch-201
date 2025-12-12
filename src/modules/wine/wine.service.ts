import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class WineService {
  constructor(private readonly prisma: PrismaService) {
    console.log('WineService constructor called');
    console.log('PrismaService instance:', prisma);
  }

  async getAllWines() {
    console.log('getAllWines called');
    return this.prisma.wine.findMany();
  }
}
