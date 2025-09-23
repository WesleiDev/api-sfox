import { IsNumber, IsString } from 'class-validator';

export class WithdrawDto {
  @IsNumber({ allowNaN: false, allowInfinity: false })
  amount: number;

  @IsString()
  description: string;
}
