import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateSongDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;
}
