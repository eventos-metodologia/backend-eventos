import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaEntity } from './entity/categoria.entity';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create.categoria.dto';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(CategoriaEntity)
        private readonly categoriaRepository: Repository<CategoriaEntity>,
    ){}
    async findById(id:number): Promise<CategoriaEntity>{
        try {
            if(!id || id <= 0 || isNaN(id)){
                throw new Error('El ID proporcionado no es válido.');
            }
            const categoria= await this.categoriaRepository.createQueryBuilder('categoria')
            .where('categoria.id = :id',{id})
            .getOne();
            if(!categoria){
                throw new NotFoundException('Categoría no encontrada.');
            }
            return categoria;
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<CategoriaEntity[]>{
        try {
            const categorias = await this.categoriaRepository.createQueryBuilder('categoria')
            .getMany();
            if(categorias.length === 0){
                throw new NotFoundException('No se encontraron categorías.');
            }
            return categorias;
        } catch (error) {
            throw error;
        }
    }
    async create(dto:CreateCategoriaDto): Promise<CategoriaEntity>{
        try {
            if(!dto.name || dto.name.trim() === ''){
                throw new Error('El nombre de la categoría es obligatorio.');
            }
            dto.name = dto.name.trim().toLowerCase();
            const exist=await this.categoriaRepository.createQueryBuilder('categoria')
            .where('categoria.nombre = :name',{name:dto.name})
            .getOne();
            if(exist){
                throw new Error('Ya existe una categoría con ese nombre.');
            }
            const nuevaCategoria = this.categoriaRepository.create({
                nombre:dto.name
            });
            return await this.categoriaRepository.save(nuevaCategoria);
        } catch (error) {
            throw error;
        }
    }
    async update(id:number, dto:CreateCategoriaDto): Promise<CategoriaEntity>{
        try{
            if(!id || id <= 0 || isNaN(id)){
                throw new Error('El ID proporcionado no es válido.');
            }
            dto.name = dto.name.trim().toLowerCase();
            const exsts= await this.categoriaRepository.createQueryBuilder('categoria')
            .where('categoria.nombre = :name',{name:dto.name})
            .andWhere('categoria.id != :id',{id})
            .getOne();
            if(exsts){
                throw new BadRequestException('Ya existe una categoría con ese nombre.');
            }
            const categoria = await this.categoriaRepository.createQueryBuilder('categoria')
            .where('categoria.id = :id',{id})
            .getOne();
            if(!categoria){
                throw new NotFoundException('Categoría no encontrada.');
            }
            categoria.nombre = dto.name;
            return await this.categoriaRepository.save(categoria);
        }catch(error){
            throw error;
        }
    }

}
