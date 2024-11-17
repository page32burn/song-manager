import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { PingModule } from './modules/ping/ping.module';
import { SongsModule } from './modules/songs/songs.module';
import { TagsModule } from './modules/tags/tags.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    SongsModule,
    UsersModule,
    PingModule,
    TagsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
