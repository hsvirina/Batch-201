import { Expose } from 'class-transformer';

/**
 * UserDto
 *
 * Represents a safe, public view of the User entity.
 * Used for API responses to ensure sensitive fields
 * (e.g. password, tokens) are never exposed.
 *
 * Applied via class-transformer to control serialization.
 */
export class UserDto {
  /** Unique user identifier */
  @Expose()
  id!: number;

  /** User email address */
  @Expose()
  email!: string;

  /** Display name of the user */
  @Expose()
  name!: string;

  /** Account creation timestamp */
  @Expose()
  createdAt!: Date;

  /** Last update timestamp */
  @Expose()
  updatedAt!: Date;
}