import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: number;
  iat?: number;
  exp?: number;
}

/**
 * JwtStrategy:
 * - Implements Passport JWT strategy for stateless authentication.
 * - Extracts JWT from Authorization Bearer header.
 * - Validates token signature using secret from environment variables.
 * - Attaches user info to request object for downstream guards/controllers.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) throw new Error('JWT_SECRET is not defined in .env');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  /**
   * Validate JWT payload
   * @param payload - decoded JWT payload
   * @returns object containing userId (sub) to attach to request.user
   */
  validate(payload: JwtPayload) {
    return { sub: payload.sub };
  }
}
