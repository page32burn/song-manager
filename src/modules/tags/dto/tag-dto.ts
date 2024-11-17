import { ApiProperty } from '@nestjs/swagger';

import { Tag } from '@prisma/client';
import { Type } from 'class-transformer';

export class TagDto implements Partial<Tag> {
  @Type(() => Number)
  @ApiProperty({ example: 1, description: 'タグのID' })
  id: number;

  @Type(() => String)
  @ApiProperty({ example: 'Tag Name', description: 'タグ名' })
  tag: string;

  @Type(() => Date)
  @ApiProperty({ example: new Date(), description: '作成日' })
  createdAt: Date;

  @Type(() => Date)
  @ApiProperty({ example: new Date(), description: '更新日' })
  updatedAt: Date;
}
