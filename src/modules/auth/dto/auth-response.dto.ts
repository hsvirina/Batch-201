/**
 * AuthResponseDto:
 * - Defines the shape of authentication response.
 * - Excludes sensitive fields like password.
 * - Can be extended for future features like role or permissions.
 */
export class AuthResponseDto {
  /** Unique user ID */
  id!: number;

  /** User email address */
  email!: string;

  /** User full name */
  name!: string;

  /** Account creation timestamp */
  createdAt!: Date;

  /** Last profile update timestamp */
  updatedAt!: Date;

  /** JWT access token for authentication */
  token!: string;
}
