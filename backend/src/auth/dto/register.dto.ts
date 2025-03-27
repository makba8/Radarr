import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  mail: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  username: string;
}
