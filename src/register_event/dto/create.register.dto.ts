import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRegsterDto{
   @IsNotEmpty()
   @IsString()
   @ApiProperty({ example: 'Juan Perez', description: 'Nombre completo del asistente al evento' })
   nombre:string;
   @IsNotEmpty()
   @IsNumber()
   @ApiProperty({ example: 1, description: 'ID del evento al que se registra el asistente' })
   evento:number;
   @IsNotEmpty()
   @IsString()
   @ApiProperty({ example: 'juan.perez@example.com', description: 'Correo electrónico del asistente al evento' })
   correo:string;
   @IsNotEmpty()
   @IsString()
   @ApiProperty({ example: '555-1234', description: 'Número de teléfono del asistente al evento maximo 12' })
   telefono:string;
   @IsOptional()
   @IsString()
   @ApiProperty({example:1, description:'ID del método de pago utilizado por el asistente al evento default efectivo'})
   metodo_pago:number;
   @IsNotEmpty()
   @IsString()
   @ApiProperty({ example: "desarrollo de software", description: 'Programa o motivo por el cual el asistente se registra al evento' })
   programa:string;
   @IsOptional()
   @IsString()
   @ApiProperty({ example: true, description: 'Aceptación de términos y condiciones por parte del asistente al evento default true' })
   terms_conditions:boolean;
}