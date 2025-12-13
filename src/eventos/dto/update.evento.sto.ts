import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateEventoDto{
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Concierto de Rock', description: 'Nombre del evento',required:false })
    nombre:string;
    @IsOptional()
    @ApiProperty({ example: '2025-07-15', description: 'Fecha del evento',required:false })
    fecha:Date;
    @IsOptional()
    @ApiProperty({ example: '20:00', description: 'Hora del evento',required:false })
    hora:string;
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Auditorio Nacional', description: 'Ubicación del evento',required:false })
    ubicacion:string;
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Juan Perez', description: 'Organizador del evento',required:false })
    organizador:string;
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Un gran concierto de rock con bandas famosas.', description: 'Descripción del evento',required:false })
    descripcion:string;
    @IsOptional()
    @ApiProperty({ example: '50.00', description: 'Valor de la entrada del evento',required:false })
    valor:string;
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'http://example.com/imagen.jpg', description: 'URL de la imagen del evento',required:false })
    imagen?:string;
    @IsOptional()
    @ApiProperty({ example: 1, description: 'ID de la categoría del evento',required:false })
    categriaId:number;
    @IsOptional()
    @ApiProperty({ example: 1, description: 'ID del usuario que crea el evento',required:false })
    userId:number;
    @IsOptional()
    @ApiProperty({ example: 500, description: 'Capacidad máxima del evento',required:false })
    capacidad?:number;
    @IsOptional()
    @ApiProperty({ example: true, description: 'Indica si el evento está cerrado',required:false })
    closed?:boolean;
}