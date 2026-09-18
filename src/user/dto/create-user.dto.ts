import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import {
  IsNotEmpty,
  IsStrongPassword,
  IsAlpha,
  IsEmail,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
  })
  @IsNotEmpty()
  @IsAlpha()
  name!: string;

  @ApiProperty({
    example: '@StrongPassword123',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password!: string;

  @ApiProperty({
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    enum: RoleType,
    example: RoleType.USER,
  })
  @IsNotEmpty()
  @IsEnum(RoleType)
  roles?: RoleType;
}
