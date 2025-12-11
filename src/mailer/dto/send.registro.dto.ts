import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SendRegistroDto{
    @IsNotEmpty()
    @IsString()
    nombre:string;
    @IsNotEmpty()
    @IsString()
    evento:string;
    @IsNotEmpty()
    @IsString()
    correo:string;
    @IsNotEmpty()
    @IsString()
    telefono:string;
    @IsNotEmpty()
    @IsString()
    metodoPago:string;
    @IsNotEmpty()
    @IsNumber()
    idEvento:number;
    @IsNotEmpty()
    @IsDate()
    fechaEvento:Date;
    @IsNotEmpty()
    @IsString()
    horaEvento:string;
    @IsNotEmpty()
    @IsString()
    ubicacionEvento:string;
    @IsNotEmpty()
    @IsString()
    valorEvento:string;
}