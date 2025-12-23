import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto.js';
import { AuthResponseDto } from './dto/auth-response.dto.js';

/**
 * AuthService:
 * - Handles user registration, login, logout, and token refresh flows.
 * - Uses bcrypt for secure password hashing.
 * - Issues short-lived access tokens (15 minutes) and long-lived refresh tokens (7 days).
 * - Returns user data along with access token using AuthResponseDto.
 * - Logs critical events for observability and debugging.
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,  // Database access via Prisma
    private readonly jwtService: JwtService, // JWT generation and validation
  ) { }

  /**
   * Registers a new user
   * - Throws BadRequestException if the email is already in use
   * - Hashes the password before saving
   * - Returns user data with an access token
   */
  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
      },
    });

    const { accessToken } = this.generateTokens(user.id);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: accessToken,
    };
  }

  /**
   * Logs in an existing user
   * - Validates email and password
   * - Throws BadRequestException if credentials are invalid
   * - Returns user data with an access token
   */
  async login(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    const { accessToken } = this.generateTokens(user.id);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: accessToken,
    };
  }

  /**
 * Fetches user by email from the database
 * - Used in controller to attach user data to AuthResponseDto
 */
  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Generates JWT access and refresh tokens
   * - Access token is short-lived (15 minutes)
   * - Refresh token is long-lived (7 days)
   * - Can be extended to store refresh tokens in DB for revocation
   */
  private generateTokens(userId: number) {
    const payload = { sub: userId };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  /**
   * Refreshes JWT tokens
   * - Accepts userId and refresh token
   * - Returns a new access token and refresh token
   * - Can include refresh token validation if stored in DB
   */
  async refreshTokens(userId: number, refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    // Optionally validate refreshToken here
    const { accessToken } = this.generateTokens(userId);
    const { refreshToken: newRefreshToken } = this.generateTokens(userId);

    return { accessToken, refreshToken: newRefreshToken };
  }

  /**
   * Logs out the user
   * - Currently logs the event
   * - Access tokens will expire automatically after 15 minutes
   * - Can be extended to implement token blacklist for immediate revocation
   */
  async logout(userId: number) {
    this.logger.log(`User ${userId} logged out`);
  }
}