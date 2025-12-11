// src/auth/auth.service.ts
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from 'src/user/entity/user.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolEntity } from 'src/rol/entity/rol.entity';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import { LoginDto } from './dtos/login-auth.dto';

@Injectable()
export class AuthService {
constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(RolEntity)
    private readonly rolRepository: Repository<RolEntity>,


    private readonly jwtService: JwtService,

  ) { }

  async registerFullUser(userData: RegisterAuthDto): Promise<{ message: string; token: string }> {
    const existingUser = await this.userRepository.findOne({ where: { usuario: userData.usuario } });
    if (existingUser) {
      throw new BadRequestException('El usuario ya está registrado');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.contrasena, salt);

    const rol = await this.rolRepository.findOne({ where: { id: userData.rol } });
    if (!rol) {
      throw new BadRequestException('El rol especificado no existe');
    }

    const newUser = this.userRepository.create({
      usuario: userData.usuario,
      contrasena: hashedPassword,
      nombre: userData.nombre,
      rol, // Asignar el rol al usuario
    });

    await this.userRepository.save(newUser);

    const payload = {
      id: newUser.id,
      usuario: newUser.usuario,
      rol: newUser.rol.id,
    };

    const token = this.jwtService.sign(payload);

    return { message: 'Usuario registrado exitosamente', token };
  }

  async login(dto: LoginDto): Promise<{ token: string }> {
    const { usuario, contrasena } = dto;

    const user = await this.userRepository.findOne({
      where: { usuario },
      relations: ['rol'], // Asegurarse de cargar la relación con el rol
    });

    if (!user) throw new UnauthorizedException('Usuario no registrado');

    const passwordOK = await bcrypt.compare(contrasena, user.contrasena);
    if (!passwordOK) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = {
      id: user.id,
      usuario: user.usuario,
      rol: user.rol.id,
    };

    const token = this.jwtService.sign(payload);
    return { token };
  }
}