import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventoEntity } from './entity/evento.entity';
import { Repository } from 'typeorm';
import { SearchEventosDto } from './dto/search.dto';
import { CreateEventoDto } from './dto/create.evento.dto';
import { UpdateEventoDto } from './dto/update.evento.sto';
import { UserService } from 'src/user/user.service';
import { CategoriaService } from 'src/categoria/categoria.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RegisterEventService } from 'src/register_event/register_event.service';

@Injectable()
export class EventosService {
    constructor(
        @InjectRepository(EventoEntity)
        private readonly eventoRepository: Repository<EventoEntity>,
        private readonly userService: UserService,
        private readonly categoriaService: CategoriaService,
        @Inject(forwardRef(() => RegisterEventService))
        private readonly registroEventoService: RegisterEventService,
    ) { }

    async findAll(dto: SearchEventosDto): Promise<EventoEntity[]> {
        try {
            const queryBuilder = this.eventoRepository.createQueryBuilder('evento')
                .leftJoinAndSelect('evento.categoria', 'categoria')
                .leftJoin('evento.user', 'user')
                .addSelect(['user.id', 'user.usuario']);
            if (dto.searchParam) {
                queryBuilder.andWhere('evento.nombre LIKE :searchParam OR evento.descripcion LIKE :searchParam OR evento.ubicacion LIKE :searchParam OR evento.organizador LIKE :searchParam', { searchParam: `%${dto.searchParam}%` });
            }
            if (dto.fechaInicio) {
                queryBuilder.andWhere('evento.fecha >= :fechaInicio', { fechaInicio: dto.fechaInicio });
            }
            if (dto.fechaFin) {
                queryBuilder.andWhere('evento.fecha <= :fechaFin', { fechaFin: dto.fechaFin });
            }
            if (dto.horaInicio) {
                queryBuilder.andWhere('evento.hora >= :horaInicio', { horaInicio: dto.horaInicio });
            }
            if (dto.horaFin) {
                queryBuilder.andWhere('evento.hora <= :horaFin', { horaFin: dto.horaFin });
            }
            if (dto.orderBy) {
                const orderDirection = dto.orderDirection || 'ASC';
                queryBuilder.orderBy(`evento.${dto.orderBy}`, orderDirection);
            }
            if (dto.free !== undefined) {
                if (dto.free) {
                    queryBuilder.andWhere('evento.valor = 0');
                } else {
                    queryBuilder.andWhere('evento.valor > 0');
                }
            }

            const eventos = await queryBuilder.getMany();
            if (eventos.length === 0) {
                throw new NotFoundException('No se encontraron eventos que coincidan con los criterios de búsqueda.');
            }
            const eventosConCupos = await Promise.all(eventos.map(async (evento) => {
                const registrosCount = await this.registroEventoService.countRegistersByEvent(evento.id);
                const cuposDisponibles = Number(evento.capacidad) - registrosCount;
                return { ...evento, cuposDisponibles };
            }));
            return eventosConCupos;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<EventoEntity> {
        try {
            if (!id || id <= 0 || isNaN(id)) {
                throw new BadRequestException('El ID proporcionado no es válido.');
            }
            const evento = await this.eventoRepository.createQueryBuilder('evento')
                .where('evento.id = :id', { id })
                .leftJoinAndSelect('evento.categoria', 'categoria')
                .leftJoin('evento.user', 'user')
                .addSelect(['user.id', 'user.usuario'])
                .getOne();

            if (!evento) {
                throw new NotFoundException(`No se encontró ningún evento con ID ${id}.`);
            }
            const contadordeRegistros = await this.registroEventoService.countRegistersByEvent(evento.id);
            const cuposDisponibles = Number(evento.capacidad) - contadordeRegistros;
            evento['cuposDisponibles'] = cuposDisponibles;
            return evento;
        } catch (error) {
            throw error;
        }
    }

    async create(evento: CreateEventoDto): Promise<EventoEntity> {
        try {
            const user = await this.userService.findById(evento.userId);
            const categoria = await this.categoriaService.findById(evento.categriaId);

            const newEvento = this.eventoRepository.create({
                nombre: evento.nombre,
                fecha: evento.fecha,
                hora: evento.hora,
                ubicacion: evento.ubicacion,
                organizador: evento.organizador,
                descripcion: evento.descripcion,
                valor: evento.valor,
                imagen: evento.imagen,
                categoria: categoria,
                user: user,
                capacidad: (evento.capacidad).toString(),
            });
            return await this.eventoRepository.save(newEvento);
        } catch (error) {
            throw error;
        }
    }
    async delete(id: number): Promise<{ message: string }> {
        try {
            if (!id || id <= 0 || isNaN(id)) {
                throw new BadRequestException('El ID proporcionado no es válido.');
            }
            const evento = await this.eventoRepository.createQueryBuilder('evento')
                .where('evento.id = :id', { id })
                .getOne();
            if (!evento) {
                throw new NotFoundException(`No se encontró ningún evento con ID ${id}.`);
            }
            await this.eventoRepository.remove(evento);
            return { message: `Evento con ID ${id} eliminado exitosamente.` };
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, eventoUpdate: UpdateEventoDto): Promise<EventoEntity> {
        try {
            if (!id || id <= 0 || isNaN(id)) {
                throw new BadRequestException('El ID proporcionado no es válido.');
            }
            const evento = await this.eventoRepository.createQueryBuilder('evento')
                .leftJoinAndSelect('evento.user', 'user')
                .where('evento.id = :id', { id })
                .getOne();
            if (!evento) {
                throw new NotFoundException(`No se encontró ningún evento con ID ${id}.`);
            }
            if (eventoUpdate.nombre !== undefined) {
                evento.nombre = eventoUpdate.nombre;
            }
            if (eventoUpdate.fecha !== undefined) {
                evento.fecha = eventoUpdate.fecha;
            }
            if (eventoUpdate.hora !== undefined) {
                evento.hora = eventoUpdate.hora;
            }
            if (eventoUpdate.ubicacion !== undefined) {
                evento.ubicacion = eventoUpdate.ubicacion;
            }
            if (eventoUpdate.organizador !== undefined) {
                evento.organizador = eventoUpdate.organizador;
            }
            if (eventoUpdate.descripcion !== undefined) {
                evento.descripcion = eventoUpdate.descripcion;
            }
            if (eventoUpdate.valor !== undefined) {
                evento.valor = eventoUpdate.valor;
            }
            if (eventoUpdate.imagen !== undefined) {
                evento.imagen = eventoUpdate.imagen;
            }
            if (evento.user && eventoUpdate.userId == undefined) {
                throw new BadRequestException('El ID del usuario es obligatorio.');
            }
            if (evento.user.id !== eventoUpdate.userId && eventoUpdate.userId !== undefined) {
                throw new BadRequestException("no tiene permiso para actualizar este evento.");
            }
            if (eventoUpdate.categriaId !== undefined) {
                const categoria = await this.categoriaService.findById(eventoUpdate.categriaId);
                evento.categoria = categoria;
            }
            let capacidadActualizada = evento.capacidad;
            if (eventoUpdate.capacidad !== undefined) {
                evento.capacidad = (eventoUpdate.capacidad).toString();
                capacidadActualizada = evento.capacidad;
            }

            const now = new Date();
            const eventDateTime = new Date(`${evento.fecha}T${evento.hora}`);
            const registrosCount = await this.registroEventoService.countRegistersByEvent(evento.id);

            if (
                eventDateTime > now &&
                Number(capacidadActualizada) > registrosCount
            ) {
                evento.closed = false;
            }
            else if (
                eventoUpdate.capacidad !== undefined &&
                eventDateTime > now &&
                Number(eventoUpdate.capacidad) > registrosCount
            ) {
                evento.closed = false;
            }
            // Si la fecha y hora ya pasaron o la capacidad es menor o igual a los registros, mantener cerrado
            else if (
                eventDateTime <= now ||
                Number(capacidadActualizada) <= registrosCount
            ) {
                evento.closed = true;
            }

            if (eventoUpdate.closed !== undefined) {
                evento.closed = eventoUpdate.closed;
            }

            return await this.eventoRepository.save(evento);
        } catch (error) {
            throw error;
        }
    }
    async getEventosByUserId(userId: number): Promise<EventoEntity[]> {
        try {
            if (!userId || userId <= 0 || isNaN(userId)) {
                throw new BadRequestException('El ID de usuario proporcionado no es válido.');
            }
            const eventos = await this.eventoRepository.createQueryBuilder('evento')
                .leftJoinAndSelect('evento.user', 'user')
                .leftJoinAndSelect('evento.categoria', 'categoria')
                .where('user.id = :userId', { userId })
                .getMany();
            return eventos;
        } catch (error) {
            throw error;
        }
    }

    async findByCategoria(categoriaId: number) {
        return this.eventoRepository.find({
            where: {
                categoria: { id: categoriaId }
            },
            relations: ['categoria', 'user'],
            order: { fecha: 'ASC' }
        });
    }

    async closedEevent(eventId: number): Promise<EventoEntity> {
        try {
            if (!eventId || eventId <= 0 || isNaN(eventId)) {
                throw new BadRequestException('El ID proporcionado no es válido.');
            }
            const evento = await this.eventoRepository.createQueryBuilder('evento')
                .where('evento.id = :eventId', { eventId })
                .getOne();
            if (!evento) {
                throw new NotFoundException(`No se encontró ningún evento con ID ${eventId}.`);
            }
            evento.closed = true;
            return await this.eventoRepository.save(evento);
        } catch (error) {
            throw error;
        }
    }

    verifyAndClosedEventHora(): void {
        try {
            console.log('Iniciando verificación de eventos para cierre automático...');
            const currentDate = new Date();
            this.eventoRepository.find({ where: { closed: false } }).then(eventos => {
                eventos.forEach(async (evento) => {
                    const eventDateTime = new Date(`${evento.fecha}T${evento.hora}`);
                    if (currentDate >= eventDateTime) {
                        evento.closed = true;
                        await this.eventoRepository.save(evento);
                        console.log(`Evento con ID ${evento.id} cerrado automáticamente.`);
                    }
                });
            }).catch(error => {
                console.error('Error al verificar eventos para cierre automático:', error);
            });
        } catch (error) {
            throw error;
        }
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    handleVerifyAndClosedEventHoraCron() {
        this.verifyAndClosedEventHora();
    }
}
