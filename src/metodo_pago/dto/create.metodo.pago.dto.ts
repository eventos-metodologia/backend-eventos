import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class CreateMetodoPagoDto{
    @ApiProperty({ example: 'Tarjeta de crédito', description: 'Nombre del método de pago' })
    @IsNotEmpty()
    @IsString()
    name:string;
}