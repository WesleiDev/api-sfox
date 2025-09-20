import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  register(@Body() data: CreateUserDto) {
    return this.userService.register(data);
  }
}
