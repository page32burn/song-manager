import { Module } from '@nestjs/common';
import { SongsModule } from './modules/songs/songs.module';
import { UsersModule } from './modules/users/users.module';
import { PingModule } from './modules/ping/ping.module';

@Module({
  imports: [SongsModule, UsersModule, PingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
