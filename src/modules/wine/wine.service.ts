import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { WineDto } from './dto/wine.dto.js';
import { Wine as PrismaWine } from '@prisma/client';

/**
 * WineService:
 * - Handles business logic related to wines.
 * - Uses PrismaService for DB access.
 */
@Injectable()
export class WineService {
  private readonly logger = new Logger(WineService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAllWines(): Promise<WineDto[]> {
    const wines = await this.prisma.wine.findMany();

    return wines.map(
      (w: PrismaWine) =>
        new WineDto({
          id: w.id,
          name: w.name,
          batchNumber: w.batchNumber ?? undefined,
          vintage: w.vintage ?? undefined,
          kind: w.kind ?? undefined,
          type: w.type ?? undefined,
          color: w.color ?? undefined,
          grapeVariety: w.grapeVariety ?? undefined,
          volume: w.volume ?? undefined,
          producer: w.producer ?? undefined,
          region: w.region ?? undefined,
          packaging: w.packaging ?? undefined,
          description: w.description ?? undefined,
          photoUrl: w.photoUrl ?? undefined,
          price: w.price ? Number(w.price) : 0,
        }),
    );
  }
}
