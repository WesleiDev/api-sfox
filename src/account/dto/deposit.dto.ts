import { IsNumber } from 'class-validator';

export class DepositDto {
  @IsNumber({ allowNaN: false, allowInfinity: false })
  amount: number;
}
