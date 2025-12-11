import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrarEventoEntity } from './entity/register.evento.entity';
import { Repository } from 'typeorm';
import { MetodoPagoService } from 'src/metodo_pago/metodo_pago.service';
import { CreateRegsterDto } from './dto/create.register.dto';
import { EventosService } from 'src/eventos/eventos.service';
import { SendRegistroDto } from 'src/mailer/dto/send.registro.dto';
import { MailService } from 'src/mailer/mail.service';

@Injectable()
export class RegisterEventService {
    constructor(
        @InjectRepository(RegistrarEventoEntity)
        private readonly registrarEventoRepository: Repository<RegistrarEventoEntity>,
        private readonly metodoPagoService: MetodoPagoService,
        private readonly eventosService: EventosService,
        private readonly mailerService: MailService
    ) { }

    async createRegister(dto: CreateRegsterDto): Promise<RegistrarEventoEntity> {
        try {
            if (!dto) {
                throw new BadRequestException('Datos inválidos');
            }
            let metodo_pago;
            if (dto.metodo_pago) {
                const metodoPago = await this.metodoPagoService.findOne(dto.metodo_pago);
                if (!metodoPago) {
                    throw new BadRequestException('Método de pago no válido');
                }
                metodo_pago = metodoPago;
            } else {
                const defaultMetodoPago = await this.metodoPagoService.getByName('efectivo');
                metodo_pago = defaultMetodoPago;
            }
            const eventoExists = await this.eventosService.findById(dto.evento);
            if (!eventoExists) {
                throw new BadRequestException('El evento al que intenta registrarse no existe o no puedes registrarte');
            }
            if (eventoExists.closed) {
                throw new BadRequestException('El evento al que intenta registrarse está cerrado');
            }
            const existEmailFromEvent = await this.registrarEventoRepository.createQueryBuilder('registro')
                .where('registro.correo = :correo', { correo: dto.correo })
                .andWhere('registro.evento = :evento', { evento: dto.evento })
                .getOne();
            if (existEmailFromEvent) {
                throw new BadRequestException('El correo ya está registrado para este evento');
            }
            const telefonoRegister = await this.registrarEventoRepository.createQueryBuilder('registro')
                .where('registro.telefono = :telefono', { telefono: dto.telefono })
                .andWhere('registro.evento = :evento', { evento: dto.evento })
                .getOne();
            if (telefonoRegister) {
                throw new BadRequestException('El teléfono ya está registrado para este evento');
            }
            if (dto.telefono.length > 12) {
                throw new BadRequestException('El número de teléfono excede el máximo de 12 caracteres');
            }
            const newRegister = this.registrarEventoRepository.create({
                nombre: dto.nombre,
                evento: eventoExists,
                correo: dto.correo,
                telefono: dto.telefono,
                metodo_pago: metodo_pago,
                programa: dto.programa,
                terms_conditions: dto.terms_conditions ?? true
            });
            const registerSaved = await this.registrarEventoRepository.save(newRegister);
            try {
                const mailOptions: SendRegistroDto = {
                    nombre: registerSaved.nombre,
                    correo: registerSaved.correo,
                    evento: registerSaved.evento.nombre,
                    fechaEvento: registerSaved.evento.fecha,
                    horaEvento: registerSaved.evento.hora,
                    ubicacionEvento: registerSaved.evento.ubicacion,
                    valorEvento: registerSaved.evento.valor,
                    telefono: registerSaved.telefono,
                    metodoPago: metodo_pago.nombre,
                    idEvento: registerSaved.evento.id,
                }
                console.log('Sending registration email with options:', mailOptions);
                await this.mailerService.sendMail(mailOptions);
            } catch (error) {
                console.warn('Error sending registration email:', error);
            }

            return registerSaved;

        } catch (error) {
            throw error;
        }
    }

    async getRegistersByEvent(eventoId: number): Promise<RegistrarEventoEntity[]> {
        try {
            const registers = await this.registrarEventoRepository.createQueryBuilder('registro')
                .where('registro.evento = :eventoId', { eventoId })
                .leftJoinAndSelect('registro.metodo_pago', 'metodo_pago')
                .getMany();
            return registers;
        } catch (error) {
            throw error;
        }
    }

    async getAllRegisters(): Promise<RegistrarEventoEntity[]> {
        try {
            const registers = await this.registrarEventoRepository.createQueryBuilder('registro')
                .leftJoinAndSelect('registro.metodo_pago', 'metodo_pago')
                .leftJoinAndSelect('registro.evento', 'evento')
                .getMany();
            return registers;
        } catch (error) {
            throw error;
        }
    }

    async countRegistersByEvent(eventoId: number): Promise<number> {
        try {
            const count = await this.registrarEventoRepository.createQueryBuilder('registro')
                .where('registro.evento = :eventoId', { eventoId })
                .getCount();
            return count;
        } catch (error) {
            throw error;
        }
    }

    async getRegisterByemail(correo: string): Promise<RegistrarEventoEntity[]> {
        try {
            const registers = await this.registrarEventoRepository.createQueryBuilder('registro')
                .where('registro.correo = :correo', { correo })
                .leftJoinAndSelect('registro.metodo_pago', 'metodo_pago')
                .getMany();
            return registers;
        } catch (error) {
            throw error;
        }
    }

    async getRegisterByPhone(telefono: string): Promise<RegistrarEventoEntity[]> {
        try {
            const registers = await this.registrarEventoRepository.createQueryBuilder('registro')
                .where('registro.telefono = :telefono', { telefono })
                .leftJoinAndSelect('registro.metodo_pago', 'metodo_pago')
                .getMany();
            return registers;
        } catch (error) {
            throw error;
        }
    }

}
