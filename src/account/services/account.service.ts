import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AccountEntity, EAccountStatus } from '../entities/account.entity';
import { AccountRepository } from '../repositories/account.repository';
import { StringUtils } from '@/common/utils/string.utils';
import { AccountMapper } from '../mapprs';
import { DepositDto, QueryListTransactionsDto } from '../dto';
import type { IPerformeOperation } from '../interfaces';
import { EOperationTypeTransaction } from '../etc/types';
import { TransactionService } from './transaction.service';
import { BankAccountService } from '@/bank/services/bank-account.service';
import { Money } from '@/common/utils/money.utils';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly transactionService: TransactionService,
    private readonly bankAccountService: BankAccountService,
  ) {}

  @Transactional()
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

  @Transactional()
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

  @Transactional()
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

  @Transactional()
  private async _setAccountToInactive(accountId: string) {
    await this.accountRepository.update(accountId, {
      status: EAccountStatus.INACTIVE,
    });
  }

  @Transactional()
  private async _setAccountToActive(accountId: string) {
    await this.accountRepository.update(accountId, {
      status: EAccountStatus.ACTIVE,
    });
  }

  @Transactional()
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

  @Transactional()
  decrementAccount(accountId: string, amount: number) {
    return this.accountRepository.decrement(accountId, amount);
  }

  @Transactional()
  incrementAccount(accountId: string, amount: number) {
    return this.accountRepository.increment(accountId, amount);
  }

  @Transactional()
  async deposit(userId: string, data: DepositDto) {
    const account = await this.findByUserId(userId);

    if (!account) {
      throw new UnprocessableEntityException(
        'You do not have an account to do this deposit',
      );
    }

    return this.performOperation({
      account,
      amount: data.amount,
      userId,
      type: EOperationTypeTransaction.INCREMENT,
      description: data.description,
    });
  }

  @Transactional()
  async withdraw(userId: string, data: DepositDto) {
    const account = await this.findByUserId(userId);

    if (!account) {
      throw new UnprocessableEntityException(
        'You do not have an account to do this withdraw',
      );
    }

    return this.performOperation({
      account,
      amount: data.amount,
      userId,
      type: EOperationTypeTransaction.DECREMENT,
      description: data.description,
    });
  }

  listTransactions(userId: string, query: QueryListTransactionsDto) {
    return this.transactionService.list(userId, query);
  }

  @Transactional()
  async performOperation(data: IPerformeOperation) {
    const { account, amount } = data;

    const payloadTransaction =
      AccountMapper.mapPayloadToCreateTransaction(data);

    const transaction =
      await this.transactionService.createTransaction(payloadTransaction);

    if (data.type === EOperationTypeTransaction.DECREMENT) {
      const hasInsufficientFunds = Money.fromDollars(amount).isLess(
        account.balance,
      );

      if (hasInsufficientFunds) {
        throw new BadRequestException(
          `You has no sufficient funds to operate this withdraw`,
        );
      }

      await Promise.all([
        this.decrementAccount(account.id, amount),
        this.bankAccountService.decrement(amount),
      ]);
    } else {
      await Promise.all([
        this.incrementAccount(account.id, amount),
        this.bankAccountService.increment(amount),
      ]);
    }

    return AccountMapper.mapTransactionResponse(transaction);
  }
}
