import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEventoDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Concierto de Rock', description: 'Nombre del evento',required:true })
    nombre:string;
    @IsNotEmpty()
    @ApiProperty({ example: '2025-07-15', description: 'Fecha del evento',required:true })
    fecha:Date;
    @IsNotEmpty()
    @ApiProperty({ example: '20:00', description: 'Hora del evento',required:true })
    hora:string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Auditorio Nacional', description: 'Ubicación del evento',required:true })
    ubicacion:string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Juan Perez', description: 'Organizador del evento',required:true })
    organizador:string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Un gran concierto de rock con bandas famosas.', description: 'Descripción del evento',required:true })
    descripcion:string;
    @IsNotEmpty()
    @ApiProperty({ example: '50.00', description: 'Valor de la entrada del evento',required:true })
    valor:string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'http://example.com/imagen.jpg', description: 'URL de la imagen del evento',required:false })
    imagen?:string;
    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'ID de la categoría del evento',required:true })
    categriaId:number;
    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'ID del usuario que crea el evento',required:true })
    userid:number;
    @IsNotEmpty()
    @ApiProperty({ example: 500, description: 'Capacidad máxima del evento',required:true })
    capacidad:number;
}