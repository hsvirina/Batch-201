import { Controller, Get } from '@nestjs/common';
import { WineService } from './wine.service.js';
import { Wine } from '@prisma/client';

@Controller('wine')
export class WineController {
  constructor(private readonly wineService: WineService) {}

  @Get()
  async getAll(): Promise<Wine[]> {
    return this.wineService.getAllWines();
  }
}
