import { Body, Controller, Post } from '@nestjs/common';
import { SignDto } from '../dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign')
  sign(@Body() data: SignDto) {
    return this.authService.sign(data);
  }
}
