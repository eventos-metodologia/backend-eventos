import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendRegistroDto } from './dto/send.registro.dto';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService:MailerService
    ){}

    async sendMail(dto:SendRegistroDto){
        await this.mailerService.sendMail({
            to:dto.correo,
            subject:'Confirmación de Registro al Evento',
            template:'./register-event',
            context:{
                nombre:dto.nombre,
                evento:dto.evento,
                fechaEvento:dto.fechaEvento,
                horaEvento:dto.horaEvento,
                ubicacionEvento:dto.ubicacionEvento,
                valorEvento:dto.valorEvento,
                metodoPago:dto.metodoPago,
                idEvento:dto.idEvento
            }
        })
    }
}
