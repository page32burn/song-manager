import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

export class UpdateTagDto {
  @ApiProperty({
    example: 'Tag Name',
    description: 'タグ名',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
