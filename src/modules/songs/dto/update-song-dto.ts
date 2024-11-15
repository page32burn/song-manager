import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateSongDto {
  @ApiProperty({
    example: 'Song Title',
    description: '楽曲のタイトル',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 200,
    description: 'BPM',
  })
  @IsOptional()
  @IsInt()
  @Min(20)
  @Max(300)
  bpm?: number;

  @ApiProperty({
    example: [1, 2],
    description: 'タグID',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tagIds?: number[];
}
