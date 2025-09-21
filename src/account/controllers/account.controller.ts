import { User } from '@/auth/decorators/user.decorator';
import { UserResponseDto } from '@/user/dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from '../services/account.service';
import { DepositDto } from '../dto';

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

  @Post('/deposit')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  deposit(@User() user: UserResponseDto, @Body() data: DepositDto) {
    return this.accountService.deposit(user.id, data);
  }

  @Post('/withdraw')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  withdraw(@User() user: UserResponseDto, @Body() data: DepositDto) {
    return this.accountService.withdraw(user.id, data);
  }
}
