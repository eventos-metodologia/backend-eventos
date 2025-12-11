import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetodoPagoEntity } from 'src/metodo_pago/entity/metodo.pago.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MetodoPagoEntity])],
  providers: [SeederService]
})
export class SeederModule {}
