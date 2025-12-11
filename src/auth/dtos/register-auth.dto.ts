import { IsString, IsNotEmpty, Length, IsNumber, Min } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty({ message: 'El campo usuario no puede estar vacío.' })
  @Length(4, 50, { message: 'El usuario debe tener entre $constraint1 y $constraint2 caracteres.' })
  usuario: string;

  @IsString()
  @IsNotEmpty({ message: 'El campo contraseña no puede estar vacío.' })
  @Length(6, 255, { message: 'La contraseña debe tener al menos $constraint1 caracteres.' })
  contrasena: string;

  @IsString()
  @IsNotEmpty({ message: 'El campo nombre no puede estar vacío.' })
  @Length(2, 100, { message: 'El nombre debe tener entre $constraint1 y $constraint2 caracteres.' })
  nombre: string;

  @IsNumber({}, { message: 'El rol debe ser un número entero (ID).' })
  @Min(1, { message: 'El ID del rol debe ser mayor a 0.' })
  rol: number;
}