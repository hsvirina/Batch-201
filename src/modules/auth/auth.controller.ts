import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { Request } from 'express';
import { AuthResponseDto } from './dto/auth-response.dto.js';

/**
 * Extends Express Request to include authenticated user ID
 */
interface AuthRequest extends Request {
  user: { sub: number };
}

/**
 * AuthController:
 * - Handles authentication endpoints: register, login, refresh, logout.
 * - Uses DTOs to validate input and enforce safe payloads.
 * - Protects sensitive endpoints with JWT guard.
 * - Supports refresh token flow for stateless sessions.
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/register
   * Registers a new user.
   * Returns access & refresh tokens.
   */
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<AuthResponseDto> {
    const authData = await this.authService.register(dto);
    return authData;
  }

  /**
   * POST /auth/login
   * Logs in an existing user.
   * Returns access & refresh tokens.
   */
  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    const authData = await this.authService.login(dto.email, dto.password);
    return authData; // authData уже содержит все необходимые поля
  }

  /**
   * POST /auth/refresh
   * Refreshes access & refresh tokens.
   * Accepts userId and refreshToken.
   * Returns new token pair if refresh token is valid.
   */
  @Post('refresh')
  refresh(@Body() body: { userId: number; refreshToken: string }) {
    return this.authService.refreshTokens(body.userId);
  }

  /**
   * POST /auth/logout
   * Logs out the current user.
   * Access tokens will expire naturally (short-lived).
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: AuthRequest) {
    this.authService.logout(req.user.sub);
    return { message: `User ${req.user.sub} logged out` };
  }
}
