import { Module } from '@nestjs/common';
import { WineService } from './wine.service.js';
import { WineController } from './wine.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

/**
 * WineModule:
 * - Encapsulates all wine-related domain logic.
 * - Registers the WineController for REST endpoints.
 * - Provides WineService for business logic.
 * - Designed to be extendable with features like filtering, pagination, and caching.
 */
@Module({
  imports: [PrismaModule], // DB access via Prisma
  controllers: [WineController], // Handles wine-related endpoints
  providers: [WineService], // Business logic for wines
  exports: [WineService], // Allow other modules to use WineService
})
export class WineModule {}
