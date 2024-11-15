import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'Song Title',
    description: '楽曲のタイトル',
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 200,
    description: 'BPM',
  })
  @IsInt()
  @Min(20)
  @Max(300)
  bpm: number;

  @ApiProperty({
    example: [1, 2],
    description: 'タグID',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tagIds?: number[];
}
