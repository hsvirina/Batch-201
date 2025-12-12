import { Module } from '@nestjs/common';
import { WineService } from './wine.service.js';
import { WineController } from './wine.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [WineController],
  providers: [WineService],
})
export class WineModule {}
