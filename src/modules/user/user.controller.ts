import { Controller, Get, UseGuards, Req, Logger } from '@nestjs/common';
import { UserService } from './user.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { Request } from 'express';
import { UserDto } from './dto/user.dto.js';
import { plainToInstance } from 'class-transformer';

interface AuthRequest extends Request {
  user: { sub: number };
}

/**
 * UserController
 * - Handles user-related HTTP endpoints
 * - All routes require authentication
 */
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  /**
   * GET /user/profile
   *
   * Returns the profile of the authenticated user.
   * Sensitive fields are excluded via UserDto.
   */
  @Get('profile')
  async getProfile(@Req() req: AuthRequest): Promise<UserDto> {
    const userId = req.user.sub;

    this.logger.debug(`Fetching profile for userId=${userId}`);

    const user = await this.userService.getUserById(userId);

    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }
}