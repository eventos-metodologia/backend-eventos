import { Module } from '@nestjs/common';
import { RegisterEventController } from './register_event.controller';
import { RegisterEventService } from './register_event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrarEventoEntity } from './entity/register.evento.entity';
import { MetodoPagoModule } from 'src/metodo_pago/metodo_pago.module';
import { EventosModule } from 'src/eventos/eventos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegistrarEventoEntity]),
    MetodoPagoModule,
    EventosModule
  ],
  controllers: [RegisterEventController],
  providers: [RegisterEventService],
  exports: [RegisterEventService]
})
export class RegisterEventModule {}
