import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  isCwfUser: boolean;

  @IsOptional()
  @IsInt()
  @MaxLength(100000)
  cwfUserId: number;
}
