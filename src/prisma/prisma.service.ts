import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // super() с url из env
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Connected to database');
    } catch (error) {
      console.error('❌ Failed to connect to database', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
