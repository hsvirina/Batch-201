import { Module } from '@nestjs/common';
import { CartService } from './cart.service.js';
import { CartController } from './cart.controller.js';
import { PrismaModule } from '../../../prisma/prisma.module.js';

/**
 * CartModule
 *
 * Encapsulates all shopping cart related logic.
 *
 * Responsibilities:
 * - Provides CartService for business logic
 * - Exposes CartController for REST API endpoints
 * - Imports PrismaModule for database access
 * - Exports CartService for use in other modules
 *
 * Notes:
 * - Keeps module self-contained
 * - Easy to extend with caching, events, or notifications in future
 */
@Module({
  imports: [PrismaModule],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}