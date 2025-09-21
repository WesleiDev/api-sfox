import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AccountEntity, EAccountStatus } from '../entities/account.entity';
import { AccountRepository } from '../repositories/account.repository';
import { StringUtils } from '@/common/utils/string.utils';
import { AccountMapper } from '../mapprs';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async create(userId: string) {
    await this._checkAccountAlreadyCreated(userId);
    const account = await this._createUniqueAccount(userId);

    if (!account) {
      throw new UnprocessableEntityException(
        'Was not possible to create your account. Please try again',
      );
    }

    return AccountMapper.mapAccountResponse(account);
  }

  private async _checkAccountAlreadyCreated(userId: string) {
    const account = await this.findByUserId(userId);

    if (account) {
      throw new BadRequestException(
        'This user already have an account created',
      );
    }
  }

  private async _createUniqueAccount(
    userId: string,
  ): Promise<AccountEntity | null> {
    const maxAttempts = 10;
    let attempt = 0;
    let success = false;

    while (attempt < maxAttempts && !success) {
      try {
        const accountNumber = StringUtils.randomStr({ length: 9 });

        const account = await this.accountRepository.save({
          user: {
            id: userId,
          },
          accountNumber,
        });

        return account;
      } catch (err) {
        //If the code alreay exist we need to try again
        if (err?.code === 'ER_DUP_ENTRY') {
          attempt++;
          success = false;
        }

        throw err;
      }
    }

    return null;
  }

  findByUserId(userId: string): Promise<AccountEntity | null> {
    return this.accountRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async closeAccount(userId: string) {
    const account = await this.findByUserId(userId);

    if (!account) {
      throw new BadRequestException('This customer has no account to be close');
    }

    if (account.status === EAccountStatus.INACTIVE) {
      throw new BadRequestException('Your account already is closed');
    }

    await this._setAccountToInactive(account.id);
  }

  private async _setAccountToInactive(accountId: string) {
    await this.accountRepository.update(accountId, {
      status: EAccountStatus.INACTIVE,
    });
  }

  private async _setAccountToActive(accountId: string) {
    await this.accountRepository.update(accountId, {
      status: EAccountStatus.ACTIVE,
    });
  }

  async activateAccount(userId: string) {
    const account = await this.findByUserId(userId);

    if (!account) {
      throw new BadRequestException('This customer has no account to be close');
    }

    if (account.status === EAccountStatus.ACTIVE) {
      throw new BadRequestException('Your account already is active');
    }

    await this._setAccountToActive(account.id);
  }
}
