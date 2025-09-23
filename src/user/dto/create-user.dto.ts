import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The first name',
    required: true,
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The last name',
    required: true,
  })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The user password',
    required: true,
  })
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email ',
    required: true,
  })
  mail: string;
}
