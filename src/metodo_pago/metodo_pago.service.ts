import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetodoPagoEntity } from './entity/metodo.pago.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetodoPagoService {
    constructor(
        @InjectRepository(MetodoPagoEntity)
        private readonly metodoPagoRepository: Repository<MetodoPagoEntity>,
    ){}

    async fynAll():Promise<MetodoPagoEntity[]>{
        try {
            const metodos=await this.metodoPagoRepository.find();
            if(!metodos || metodos.length===0){
                throw new NotFoundException('No se encontraron metodos de pago');
            }
            return metodos;
        } catch (error) {
            throw error;
        }
    }

    async findOne(id:number):Promise<MetodoPagoEntity>{
        try {
            if(!id || id<=0 || isNaN(id)){
                throw new BadRequestException('El id del metodo de pago es invalido');
            }
            const metodo=await this.metodoPagoRepository.createQueryBuilder('metodo_pago')
            .where('metodo_pago.id = :id',{id})
            .getOne();
            if(!metodo){
                throw new NotFoundException(`El metodo de pago con id ${id} no fue encontrado`);
            }
            return metodo;
        } catch (error) {
            throw error;
        }
    }

    async getByName(name:string):Promise<MetodoPagoEntity>{
        try {
            if(!name || name.trim().length===0){
                throw new BadRequestException('El nombre del metodo de pago es invalido');
            }
            const metodo=await this.metodoPagoRepository.createQueryBuilder('metodo_de_pago')
            .where('metodo_de_pago.nombre = :name',{name})
            .getOne();
            if(!metodo){
                throw new NotFoundException(`El metodo de pago con nombre ${name} no fue encontrado`);
            }
            return metodo;
        } catch (error) {
            throw error;
        }
    }

    async createMetodoPago(metodo: String):Promise<MetodoPagoEntity>{
        try {
            if(!metodo || metodo.trim().length===0){
                throw new BadRequestException('El nombre del metodo de pago es invalido');
            }
            metodo=metodo.trim().toLowerCase();
            const metodoExist=await this.metodoPagoRepository.createQueryBuilder('metodo_pago')
            .where('LOWER(TRIM(metodo_pago.nombre)) = :name',{name:metodo})
            .getOne();
            if(metodoExist){
                throw new BadRequestException(`El metodo de pago con nombre ${metodo} ya existe`);
            }
            const createMetodo= this.metodoPagoRepository.create({
                nombre:metodo.trim()
            })
            return await this.metodoPagoRepository.save(createMetodo);
        } catch (error) {
            throw error;
        }
    }

    async deleteMetodoPago(id:number):Promise<any>{
        try {
            if(!id || id<=0 || isNaN(id)){
                throw new BadRequestException('El id del metodo de pago es invalido');
            }
            const metodo=await this.metodoPagoRepository.createQueryBuilder('metodo_pago')
            .where('metodo_pago.id = :id',{id})
            .getOne();
            if(!metodo){
                throw new NotFoundException(`El metodo de pago con id ${id} no fue encontrado`);
            }
            await this.metodoPagoRepository.remove(metodo);
            return {message: 'Metodo de pago eliminado correctamente'};
        } catch (error) {
            throw error;
        }
    }
}
