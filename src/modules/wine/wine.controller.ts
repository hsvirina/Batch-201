import { Controller, Get } from '@nestjs/common';
import { WineService } from './wine.service.js';
import { WineDto } from './dto/wine.dto.js';
import { plainToInstance } from 'class-transformer';

/**
 * WineController:
 * - Exposes REST endpoints for wine-related operations.
 * - Uses DTOs to control response shape and ensure security (no sensitive fields exposed).
 * - Designed to be easily extendable with filtering, pagination, or caching in the future.
 */
@Controller('wine')
export class WineController {
  constructor(private readonly wineService: WineService) {}

  /**
   * GET /wine
   * Returns all wines in the system.
   * Transform raw database objects into WineDto instances.
   * 'excludeExtraneousValues' ensures only fields marked with @Expose in DTO are returned.
   */
  @Get()
  async getAll(): Promise<WineDto[]> {
    const wines = await this.wineService.getAllWines();
    return plainToInstance(WineDto, wines, { excludeExtraneousValues: true });
  }
}