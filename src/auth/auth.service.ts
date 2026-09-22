import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private JwtService: JwtService,
  ) {}

  async Login(LoginAuthDto: LoginAuthDto, res: Response) {
    const user = await this.UserService.findByEmail(LoginAuthDto.email);
    if (!user) throw new UnauthorizedException('Invalid email or password');
    const password = await compare(LoginAuthDto.password, user.password);
    if (!user || !password)
      throw new UnauthorizedException('Invalid email or password');

    const payload = {
      sub: user.id,
      username: user.email,
      roles: user.roles,
    };

    const token = await this.JwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      path: '/',
    });

    return {
      message: 'Authentication Successful',
      user: payload,
    };
  }
}
