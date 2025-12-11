import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class SearchEventosDto{
    @ApiProperty({
        example: 'concierto',
        description: 'Término de búsqueda para filtrar eventos por nombre, descripción, lugar u organizador.',
        required: false
    })
    @IsOptional()
    searchParam?:string;
    @ApiProperty({
        example: '2025-07-01',
        description: 'Fecha de inicio para filtrar eventos a partir de esta fecha.',
        required: false
    })
    @IsOptional()
    @IsDate()
    fechaInicio?:Date;
    @ApiProperty({
        example: '2025-07-31',
        description: 'Fecha de fin para filtrar eventos hasta esta fecha.',
        required: false
    })
    @IsOptional()
    @IsDate()
    fechaFin?:Date;
    @ApiProperty({
        example: '18:00',
        description: 'Hora de inicio para filtrar eventos a partir de esta hora.',
        required: false
    })
    @IsOptional()
    @IsString()
    horaInicio?:string;
    @ApiProperty({
        example: '23:00',
        description: 'Hora de fin para filtrar eventos hasta esta hora.',
        required: false
    })
    @IsOptional()
    @IsString()
    horaFin?:string;
    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'Teatro Nacional',
        description: 'Lugar del evento para filtrar eventos por ubicación.',
        required: false
    })
    lugar?:string;
    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'Juan Perez',
        description: 'Organizador del evento para filtrar eventos por organizador.',
        required: false
    })
    organizador?:string;
    @IsOptional()
    @IsNumber()
    @ApiProperty({
        example: 50,
        description: 'Valor de entrada para filtrar eventos por precio.',
        required: false
    })
    valorEntrada?:number;
    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        example: true,
        description: 'Indica si se deben filtrar eventos gratuitos (true) o de pago (false).',
        required: false
    })
    free?:boolean;
    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'fecha',
        description: 'Campo por el cual se ordenarán los resultados. Puede ser "fecha", "valorEntrada" o "nombre".',
        required: false
    })
    orderBy?: 'fecha' | 'valorEntrada' | 'nombre';
    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'ASC',
        description: 'Dirección de ordenamiento: "ASC" para ascendente o "DESC" para descendente.',
        required: false
    })
    orderDirection?: 'ASC' | 'DESC';
}