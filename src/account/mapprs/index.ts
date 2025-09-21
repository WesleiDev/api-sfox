import { Money } from '@/common/utils/money.utils';
import { AccountResponseDto } from '../dto';
import { AccountEntity } from '../entities/account.entity';

export class AccountMapper {
  static mapAccountResponse(account: AccountEntity): AccountResponseDto {
    return {
      id: account.id,
      accountNumber: account.accountNumber,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      balance: Money.fromCents(account.balance).toDollars(),
    };
  }
}
