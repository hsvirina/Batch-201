import { Module } from '@nestjs/common';
import { WineService } from './wine.service.js';
import { WineController } from './wine.controller.js';

@Module({
  controllers: [WineController],
  providers: [WineService],
})
export class WineModule {}
