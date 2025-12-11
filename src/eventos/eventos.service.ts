import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventoEntity } from './entity/evento.entity';
import { Repository } from 'typeorm';
import { SearchEventosDto } from './dto/search.dto';
import { CreateEventoDto } from './dto/create.evento.dto';
import { UpdateEventoDto } from './dto/update.evento.sto';

@Injectable()
export class EventosService {
    constructor(
        @InjectRepository(EventoEntity)
        private readonly eventoRepository: Repository<EventoEntity>,
    ){}

    async findAll(dto:SearchEventosDto): Promise<EventoEntity[]>{
        try {
            const queryBuilder = this.eventoRepository.createQueryBuilder('evento');
            if(dto.searchParam){
                queryBuilder.andWhere('evento.nombre LIKE :searchParam OR evento.descripcion LIKE :searchParam OR evento.ubicacion LIKE :searchParam OR evento.organizador LIKE :searchParam', { searchParam: `%${dto.searchParam}%` });
            }
            if(dto.fechaInicio){
                queryBuilder.andWhere('evento.fecha >= :fechaInicio', { fechaInicio: dto.fechaInicio });
            }
            if(dto.fechaFin){
                queryBuilder.andWhere('evento.fecha <= :fechaFin', { fechaFin: dto.fechaFin });
            }
            if(dto.horaInicio){
                queryBuilder.andWhere('evento.hora >= :horaInicio', { horaInicio: dto.horaInicio });
            }
            if(dto.horaFin){
                queryBuilder.andWhere('evento.hora <= :horaFin', { horaFin: dto.horaFin });
            }
            if(dto.orderBy){
                const orderDirection = dto.orderDirection || 'ASC';
                queryBuilder.orderBy(`evento.${dto.orderBy}`, orderDirection);
            }
            if(dto.free !== undefined){
                if(dto.free){
                    queryBuilder.andWhere('evento.valor = 0');
                }else{
                    queryBuilder.andWhere('evento.valor > 0');
                }
            }
            const eventos = await queryBuilder.getMany();
            if(eventos.length === 0){
                throw new NotFoundException('No se encontraron eventos que coincidan con los criterios de búsqueda.');
            }
            return eventos;

    
        } catch (error) {
            throw error;
        }
    }

    async findById(id:number): Promise<EventoEntity>{
        try {
            if(!id || id <= 0 || isNaN(id)){
                throw new BadRequestException('El ID proporcionado no es válido.');
            }
            const evento = await this.eventoRepository.createQueryBuilder('evento')
                .where('evento.id = :id', { id })
                .getOne();
            if(!evento){
                throw new NotFoundException(`No se encontró ningún evento con ID ${id}.`);
            }
            return evento;
        } catch (error) {
            throw error;
        }
    }

    async create(evento: CreateEventoDto):Promise<EventoEntity>{
        try {
            const newEvento = this.eventoRepository.create(evento);
            return await this.eventoRepository.save(newEvento);
        } catch (error) {
            throw error;
        }
    }
    async delete(id:number):Promise<{message:string}>{
        try {
            if(!id || id <= 0 || isNaN(id)){
                throw new BadRequestException('El ID proporcionado no es válido.');
            }
            const evento = await this.eventoRepository.createQueryBuilder('evento')
                .where('evento.id = :id', { id })
                .getOne();
            if(!evento){
                throw new NotFoundException(`No se encontró ningún evento con ID ${id}.`);
            }
            await this.eventoRepository.remove(evento);
            return { message: `Evento con ID ${id} eliminado exitosamente.` };
        } catch (error) {
            throw error;
        }
    }

    async update(id:number, eventoUpdate:UpdateEventoDto):Promise<EventoEntity>{
        try {
            if(!id || id <= 0 || isNaN(id)){
                throw new BadRequestException('El ID proporcionado no es válido.');
            }
            const evento = await this.eventoRepository.createQueryBuilder('evento')
                .where('evento.id = :id', { id })
                .getOne();
            if(!evento){
                throw new NotFoundException(`No se encontró ningún evento con ID ${id}.`);
            }
            if(eventoUpdate.nombre !== undefined){
                evento.nombre = eventoUpdate.nombre;
            }
            if(eventoUpdate.fecha !== undefined){
                evento.fecha = eventoUpdate.fecha;
            }
            if(eventoUpdate.hora !== undefined){
                evento.hora = eventoUpdate.hora;
            }
            if(eventoUpdate.ubicacion !== undefined){
                evento.ubicacion = eventoUpdate.ubicacion;
            }
            if(eventoUpdate.organizador !== undefined){
                evento.organizador = eventoUpdate.organizador;
            }
            if(eventoUpdate.descripcion !== undefined){
                evento.descripcion = eventoUpdate.descripcion;
            }
            if(eventoUpdate.valor !== undefined){
                evento.valor = eventoUpdate.valor;
            }
            return await this.eventoRepository.save(evento);
        } catch (error) {
            throw error;
        }
    }
}
