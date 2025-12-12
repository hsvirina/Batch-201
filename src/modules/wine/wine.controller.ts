import { Controller, Get } from '@nestjs/common';
import { WineService } from './wine.service.js';

@Controller('wine')
export class WineController {
  constructor(private readonly wineService: WineService) {}

  @Get()
  async getAll() {
    return this.wineService.getAllWines(); // PrismaClient уже знает тип
  }
}
