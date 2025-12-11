import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create.evento.dto';
import { SearchEventosDto } from './dto/search.dto';

@ApiTags('Eventos')
@Controller('eventos')
export class EventosController {
    constructor(
        private readonly eventosService: EventosService
    ){}
    @ApiOperation({ summary: 'Obtener todos los eventos' })
    @Post("all")
    @ApiResponse({
        status: 404,
        description: 'No se encontraron eventos que coincidan con los criterios de búsqueda.',
        schema: {
            example: {
                message: 'No se encontraron eventos que coincidan con los criterios de búsqueda.',
                error: 'Not Found',
                statusCode: 404
            }
        }
    })
    async findAll(@Body() body:SearchEventosDto){
        return this.eventosService.findAll(body);
    }

    @Get("id/:id")
    @ApiOperation({ summary: 'Obtener evento por ID' })
    @ApiResponse({
        status: 404,
        description: 'No se encontró ningún evento con ID proporcionado.',
        schema: {
            example: {
                message: 'No se encontró ningún evento con ID 1.',
                error: 'Not Found',
                statusCode: 404
            }
        }
    })
    async findById(@Param('id') id:number){
        return this.eventosService.findById(id);
    }
    
}
