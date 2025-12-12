import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateCategoriaDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Conciertos', description: 'Nombre de la categoría' })
    name:string;
}