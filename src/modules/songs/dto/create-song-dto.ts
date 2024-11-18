import { ApiProperty } from '@nestjs/swagger';

import { SongStatus } from '@prisma/client';
import {
  IsArray,
  IsEnum,
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
    required: true,
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 200,
    description: 'BPM',
    required: true,
  })
  @IsInt()
  @Min(20)
  @Max(300)
  bpm: number;

  @ApiProperty({
    example: 'STOCK',
    description: 'ステータス',
    enum: Object.values(SongStatus),
    required: true,
  })
  @IsEnum(SongStatus)
  @IsString()
  status: SongStatus;

  @ApiProperty({
    example: [1, 2],
    description: 'タグID',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tagIds?: number[];
}
