import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword, IsEmail } from 'class-validator';
export class LoginAuthDto {
  @ApiProperty({
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '@StrongPassword123',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password!: string;
}
