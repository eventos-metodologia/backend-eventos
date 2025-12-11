import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BD_HOST, BD_NAME, BD_PASSWORD, BD_PORT, BD_USER, DB_TYPE } from './config/constants';
import { MetodoPagoModule } from './metodo_pago/metodo_pago.module';
import { SeederModule } from './config/seeder/seeder.module';
import { EventosModule } from './eventos/eventos.module';
import { RegisterEventModule } from './register_event/register_event.module';
import { MailModule } from './mailer/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
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
    }),
    MetodoPagoModule,
    SeederModule,
    EventosModule,
    RegisterEventModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
