import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetodoPagoEntity } from 'src/metodo_pago/entity/metodo.pago.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(MetodoPagoEntity)
        private readonly metodoPagoRepository: Repository<MetodoPagoEntity>,
    ){}
    async onModuleInit() {
        const metodoPagoCount= await this.metodoPagoRepository.count();
        if(metodoPagoCount === 0) {
            
            await this.metodoPagoRepository.save({
                nombre:"efectivo"
            });
            console.log('Seeder: Método de pago "efectivo" creado.');
        }
    }
}
