import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async findById(id: number): Promise<UserEntity> {
        try {
            if (!id || id <= 0 || isNaN(id)) {
                throw new Error('El ID proporcionado no es válido.');
            }
            const user = await this.userRepository.createQueryBuilder('user')
                .where('user.id = :id', { id })
                .getOne();
            if (!user) {
                throw new NotFoundException(`No se encontró ningún usuario con ID ${id}.`);
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
}
