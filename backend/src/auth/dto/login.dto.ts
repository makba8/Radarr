import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  mail: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
