import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { Request } from 'express';

interface AuthRequest extends Request {
  user: { sub: number };
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: AuthRequest) {
    return this.userService.getUserById(req.user.sub);
  }
}
