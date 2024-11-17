import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    example: 'Tag Name',
    description: 'タグ名',
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;
}
