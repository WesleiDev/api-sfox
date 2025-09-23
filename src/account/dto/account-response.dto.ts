import { ApiProperty } from '@nestjs/swagger';

export class AccountResponseDto {
  @ApiProperty({
    description: 'The account identification',
  })
  id: string;

  @ApiProperty({
    description: 'When this account was created',
  })
  createdAt: Date;

  @ApiProperty({
    description:
      'If this account had any updated, this will return the date when the account was updated',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The balance',
  })
  balance: number;

  @ApiProperty({
    description: 'The account number',
  })
  accountNumber: string;
}
