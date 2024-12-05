import { ApiProperty } from '@nestjs/swagger';

import { SongStatus } from '@prisma/client';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsString,
} from 'class-validator';

export class ChangeSongsStatusDto {
  @ApiProperty({
    example: ['1', '2'],
    description: '楽曲ID',
    required: true,
  })
  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1, { message: 'songIds must contain at least one element' })
  songIds: string[];

  @ApiProperty({
    example: 'STOCK',
    description: 'ステータス',
    enum: Object.values(SongStatus),
    required: true,
  })
  @IsEnum(SongStatus)
  @IsString()
  status: SongStatus;
}
