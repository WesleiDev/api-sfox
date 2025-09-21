import request from 'supertest';
import { TestUtils } from '../../../test/utils';
import { AccountModule } from '../account.module';
import { AccountController } from '../controllers/account.controller';
import { UserModule } from '@/user/user.module';
import { UserRepository } from '@/user/repository/user.repository';
import { AuthModule } from '@/auth/auth.module';
import { AuthService } from '@/auth/services/auth.service';
import { UserResponseDto } from '@/user/dto';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { BankModule } from '@/bank/bank.module';
import { TransactionRepository } from '../repositories/transaction.repository';
import { BankAccountRepository } from '@/bank/repositories/bank-account.repository';
import { Money } from '@/common/utils/money.utils';
import { AccountRepository } from '../repositories/account.repository';
import { AccountResponseDto } from '../dto';

describe('#AccountController', () => {
  let accountController: AccountController;
  let userRepository: UserRepository;
  let authService: AuthService;
  let accountService: AccountService;
  let app: INestApplication;
  let transactionRepository: TransactionRepository;
  let bankAccountRepository: BankAccountRepository;
  let accountRepository: AccountRepository;

  beforeAll(async () => {
    app = await TestUtils.getTestingApp([
      UserModule,
      AccountModule,
      AuthModule,
      BankModule,
    ]);
    accountController = app.get(AccountController);
    userRepository = app.get(UserRepository);
    authService = app.get(AuthService);
    accountService = app.get(AccountService);
    bankAccountRepository = app.get(BankAccountRepository);
    transactionRepository = app.get(TransactionRepository);
    accountRepository = app.get(AccountRepository);
  });

  it('should be defined', () => {
    expect(accountController).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(authService).toBeDefined();
  });

  const createInitialData = async (): Promise<{
    user: UserResponseDto;
    accessToken: string;
  }> => {
    const user = await authService.signup({
      firstName: 'weslei',
      lastName: 'ferreira',
      password: '123456',
      mail: 'user@hotmail.com',
    });

    const token = await authService.sign({
      mail: 'user@hotmail.com',
      password: '123456',
    });

    return { user, accessToken: token.accessToken };
  };

  describe('#close', () => {
    it(
      'should performe close the account',
      TestUtils.runInSandbox(async () => {
        const { user, accessToken } = await createInitialData();

        const responseErrorHasNoAccount = await request(app.getHttpServer())
          .post('/account/close')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(HttpStatus.BAD_REQUEST);

        //check if we are validating when the user does not have an account
        expect(responseErrorHasNoAccount.body.message).toBe(
          'This customer has no account to be close',
        );

        //creating an account
        await accountService.create(user.id);

        await request(app.getHttpServer())
          .post('/account/close')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(HttpStatus.OK);

        //try to close an account that already are close
        const responseErrorAlreadyClosed = await request(app.getHttpServer())
          .post('/account/close')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(HttpStatus.BAD_REQUEST);

        expect(responseErrorAlreadyClosed.body.message).toBe(
          'Your account already is closed',
        );
      }),
    );
  });

  describe('#deposit', () => {
    it(
      'should performe deposit',
      TestUtils.runInSandbox(async () => {
        const { user, accessToken } = await createInitialData();

        //creating an account
        const account = (await accountService.create(
          user.id,
        )) as AccountResponseDto;

        const firstDeposit = await request(app.getHttpServer())
          .post('/account/deposit')
          .set('Authorization', `Bearer ${accessToken}`)
          .send({
            amount: 10,
          })
          .expect(HttpStatus.CREATED);

        const [bankAccount] = await bankAccountRepository.find();
        const accountUpdatedFirstTime = await accountRepository.findOne({
          where: {
            id: account.id,
          },
        });

        expect(firstDeposit.body.amount).toBe(10);
        //should increase bank account
        expect(Money.fromCents(bankAccount.balance).toDollars()).toBe(10);
        expect(
          Money.fromCents(accountUpdatedFirstTime?.balance).toDollars(),
        ).toBe(10);

        //execute some deposits

        await Promise.all([
          request(app.getHttpServer())
            .post('/account/deposit')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
              amount: 10,
            })
            .expect(HttpStatus.CREATED),
          request(app.getHttpServer())
            .post('/account/deposit')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
              amount: 10,
            })
            .expect(HttpStatus.CREATED),
          request(app.getHttpServer())
            .post('/account/deposit')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
              amount: 10,
            })
            .expect(HttpStatus.CREATED),
        ]);

        const [bankAccountUpdated] = await bankAccountRepository.find();
        const accountUpdatedLastTime = await accountRepository.findOne({
          where: {
            id: account.id,
          },
        });
        const transactions = await transactionRepository.find();

        expect(Money.fromCents(bankAccountUpdated.balance).toDollars()).toBe(
          40,
        );
        expect(
          Money.fromCents(accountUpdatedLastTime?.balance).toDollars(),
        ).toBe(40);
        expect(transactions.length).toBe(4);
      }),
    );
  });
});
