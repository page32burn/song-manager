import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { SongsModule } from './modules/songs/songs.module';
import { UsersModule } from './modules/users/users.module';
import { PingModule } from './modules/ping/ping.module';
import { TagsModule } from './modules/tags/tags.module';
import { AuthModule } from './modules/auth/auth.module';

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
