import { Module } from '@nestjs/common';
import { MetodoPagoService } from './metodo_pago.service';
import { MetodoPagoController } from './metodo_pago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetodoPagoEntity } from './entity/metodo.pago.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MetodoPagoEntity])],
  providers: [MetodoPagoService],
  controllers: [MetodoPagoController],
  exports:[MetodoPagoService]
})
export class MetodoPagoModule {}
