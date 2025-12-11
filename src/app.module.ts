import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BD_HOST, BD_NAME, BD_PASSWORD, BD_PORT, BD_USER, DB_TYPE } from './config/constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService)=>({
        type: 'mysql',
        host: configService.get(BD_HOST),
        port: configService.get(BD_PORT),
        username: configService.get(BD_USER),
        password: configService.get(BD_PASSWORD),
        database: configService.get(BD_NAME),
        entities: [__dirname +'/**/*.entity{.ts,.js}'],
        synchronize:true,
        migrationsRun:false,
        logging:true,
      }),
      inject:[ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
