import { ApiProperty } from '@nestjs/swagger';
import { MESSAGES } from '../constants/message';

export class ErrorResponseDto {
  @ApiProperty({ example: 404, description: 'HTTPステータスコード' })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request', description: 'エラーの種類' })
  errpr: string;

  @ApiProperty({
    example: MESSAGES.SONGS.ERRORS.GET_ONE_FAILED,
    description: 'エラーメッセージ',
  })
  message: string;
}
