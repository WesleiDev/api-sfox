import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'The user id. This property identify this object',
  })
  id: string;

  @ApiProperty({
    description: 'When the user was created',
  })
  createdAt: Date;

  @ApiProperty({
    description:
      'The date when this entity was updated. If has any update this will be null',
  })
  updatedAt: Date;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  mail: string;
}
