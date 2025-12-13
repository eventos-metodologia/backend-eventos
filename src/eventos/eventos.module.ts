import { forwardRef, Module } from '@nestjs/common';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoEntity } from './entity/evento.entity';
import { UserModule } from 'src/user/user.module';
import { CategoriaModule } from 'src/categoria/categoria.module';
import { RegisterEventModule } from 'src/register_event/register_event.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([EventoEntity]),
    UserModule,
    CategoriaModule,
    forwardRef(()=> RegisterEventModule)
  ],
  controllers: [EventosController],
  providers: [EventosService],
  exports: [EventosService]
})
export class EventosModule {}
