import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestDbModule } from './modules-v1/test-db/test-db.module';
import { ThrottlerModule } from '@nestjs/throttler';
import ms from 'ms';
import { MediaModule } from './modules-v1/media/media.module';
import { UserModule } from './modules-v1/user/user.module';
import { AuthModule } from './modules-v1/auth/auth.module';
import { BrandModule } from './modules-v1/brand/brand.module';
import { CategoryModule } from './modules-v1/category/category.module';
import { FileModule } from './modules-v1/file/file.module';
import { RolesModule } from './modules-v1/roles/roles.module';
import { MailModule } from './modules-v1/mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_HOST_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [
          __dirname + '/modules-*/**/entities/*.entity{.ts,.js}',
          __dirname + '/database/entities/*.entity{.ts,.js}',
        ],
        synchronize: config.get<boolean>('DB_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (config: ConfigService) => [
        {
          ttl: Number(ms(config.get<string>('THROTTLE_TTL') || '1m')),
          limit: config.get<number>('THROTTLE_LIMIT') || 60,
        },
      ],
      inject: [ConfigService],
    }),
    TestDbModule,
    MediaModule,
    UserModule,
    AuthModule,
    BrandModule,
    CategoryModule,
    FileModule,
    RolesModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
