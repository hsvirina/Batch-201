import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

/**
 * WineService:
 * - Handles business logic related to wines.
 * - Uses PrismaService for DB access.
 */
@Injectable()
export class WineService {
  private readonly logger = new Logger(WineService.name);

  constructor(private readonly prisma: PrismaService) { }

  // Fetch all wines from the database
  // Convert Decimal price to number for API consistency
  async getAllWines() {
    this.logger.log('Querying DB for all wines');
    const wines = await this.prisma.wine.findMany();

    return wines.map(w => ({
      ...w,
      price: w.price ? Number(w.price) : 0,
    }));
  }
}
