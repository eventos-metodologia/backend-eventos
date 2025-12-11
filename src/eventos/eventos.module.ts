import { Module } from '@nestjs/common';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoEntity } from './entity/evento.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([EventoEntity]),
  ],
  controllers: [EventosController],
  providers: [EventosService]
})
export class EventosModule {}
