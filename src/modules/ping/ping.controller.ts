import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('ping')
@Controller('ping')
export class PingController {
  @Get()
  @ApiOperation({ summary: '疎通確認' })
  @ApiResponse({ status: 200, description: 'Ping' })
  ping(): string {
    return 'ping';
  }
}
