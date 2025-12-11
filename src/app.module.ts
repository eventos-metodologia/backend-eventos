import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BD_HOST, BD_NAME, BD_PASSWORD, BD_PORT, BD_USER } from './config/constants';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService)=>({
        type: 'mysql',
        host: configService.get(BD_HOST),
        port: configService.get(BD_PORT) as number,
        username: configService.get(BD_USER),
        password: configService.get(BD_PASSWORD),
        database: configService.get(BD_NAME),
        entities: [__dirname +'/**/*.entity{.ts,.js}'],
        synchronize:false, // Cambiado a false para evitar la sincronización automática
        migrationsRun:false, // Asegurarse de que las migraciones no se ejecuten automáticamente
        logging:false,
      }),
      inject:[ConfigService]
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
