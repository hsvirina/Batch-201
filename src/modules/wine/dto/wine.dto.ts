import { Expose } from 'class-transformer';

/**
 * WineDto:
 * - Defines the shape of wine data returned by the API.
 * - Exposes only safe fields to clients (prevents leaking sensitive/internal DB fields).
 * - Uses class-transformer to automatically serialize/deserialize data.
 * - Can be extended for filtering, masking, or formatting fields in the future.
 */
export class WineDto {
  @Expose() id!: number;
  @Expose() name!: string;
  @Expose() batchNumber?: string;
  @Expose() vintage?: number;
  @Expose() kind?: string;
  @Expose() type?: string;
  @Expose() color?: string;
  @Expose() grapeVariety?: string;
  @Expose() volume?: string;
  @Expose() producer?: string;
  @Expose() region?: string;
  @Expose() packaging?: string;
  @Expose() price?: number;
  @Expose() description?: string;
  @Expose() photoUrl?: string;

  /**
   * Constructor allows partial initialization.
   * Useful for mapping Prisma model objects or cache results.
   */
  constructor(partial: Partial<WineDto>) {
    Object.assign(this, partial);
  }
}