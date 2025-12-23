import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * RegisterDto:
 * - Defines the shape of payload for user registration.
 * - Validates input to prevent invalid or malicious data.
 * - Enforces minimum password length for basic security.
 * - Can be extended with roles, referral codes, or other metadata in the future.
 */
export class RegisterDto {
  /** User email, must be valid format */
  @IsEmail()
  email!: string;

  /** User password, at least 6 characters */
  @IsString()
  @MinLength(6)
  password!: string;

  /** User display name */
  @IsString()
  name!: string;
}