import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(
    email: string,
    pass: string,
    name: string,
  ): Promise<{ access_token: string }> {
    const existing = await this.userService.findOne(email);
    if (existing) {
      throw new UnauthorizedException();
    }
    if (!email || !pass || !name) {
      throw new UnauthorizedException();
    }

    const createdUser = new User(email, pass, name);

    const user = await this.userService.create(createdUser);
    console.log('User created: ', user);

    const payload = { sub: user.email, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
