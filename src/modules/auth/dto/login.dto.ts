import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * LoginDto:
 * - Defines the shape of payload for user login.
 * - Validates input to prevent invalid or malicious data.
 * - Password must meet minimum length requirement.
 * - Ensures email is a valid format.
 * - Can be extended in the future for multi-factor authentication or device info.
 */
export class LoginDto {
  /** User email, must be a valid format */
  @IsEmail()
  email!: string;

  /** User password, minimum 6 characters */
  @IsString()
  @MinLength(6)
  password!: string;
}
