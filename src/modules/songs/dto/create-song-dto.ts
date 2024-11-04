import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(20)
  @Max(300)
  bpm: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tagIds?: number[];
}
