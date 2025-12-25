import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JwtAuthGuard:
 * - Protects routes using JWT authentication strategy.
 * - Automatically validates access tokens from Authorization header.
 * - Attaches validated user payload to request object (`req.user`).
 *
 * Used to secure endpoints that require an authenticated user.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
