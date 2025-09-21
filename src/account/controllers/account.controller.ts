import { User } from '@/auth/decorators/user.decorator';
import { UserResponseDto } from '@/user/dto';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from '../services/account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createAccount(@User() user: UserResponseDto) {
    return this.accountService.create(user.id);
  }

  @Post('/close')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  closeAccount(@User() user: UserResponseDto) {
    return this.accountService.closeAccount(user.id);
  }

  @Post('/activate')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  activateAccount(@User() user: UserResponseDto) {
    return this.accountService.activateAccount(user.id);
  }
}
