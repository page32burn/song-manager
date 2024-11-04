import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { SongsModule } from './modules/songs/songs.module';
import { UsersModule } from './modules/users/users.module';
import { PingModule } from './modules/ping/ping.module';
import { TagsModule } from './modules/tags/tags.module';

@Module({
  imports: [PrismaModule, SongsModule, UsersModule, PingModule, TagsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
