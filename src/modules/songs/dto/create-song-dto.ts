import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;
}
