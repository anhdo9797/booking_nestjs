import { Controller, Post } from '@nestjs/common';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }
}
