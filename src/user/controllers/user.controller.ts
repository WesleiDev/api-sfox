import { Body, Controller, Get, UseGuards } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@/auth/decorators/user.decorator';
import { UserResponseDto } from '../dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    type: UserResponseDto,
    description: 'Get information about the logged user',
  })
  me(@User() user: UserResponseDto) {
    return user;
  }
}
