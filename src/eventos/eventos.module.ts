import { Module } from '@nestjs/common';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoEntity } from './entity/evento.entity';
import { UserModule } from 'src/user/user.module';
import { CategoriaModule } from 'src/categoria/categoria.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([EventoEntity]),
    UserModule,
    CategoriaModule,
  ],
  controllers: [EventosController],
  providers: [EventosService],
  exports: [EventosService]
})
export class EventosModule {}
