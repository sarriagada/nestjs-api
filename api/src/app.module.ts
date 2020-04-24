import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataInterceptor } from './util/data.interceptor';
import { DataPipe } from './util/data.pipe';
import { ConfigModule } from '@nestjs/config';

import { Mission } from './models/mission.model';
import { MissionsController } from './missions/missions.controller';
import { MissionsService } from './missions/missions.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.model{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Mission])
  ],
  controllers: [
    AppController,
    MissionsController
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DataPipe,
    },
    MissionsService
  ],
})
export class AppModule {}
