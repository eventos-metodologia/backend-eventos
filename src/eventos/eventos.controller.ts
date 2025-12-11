import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create.evento.dto';
import { SearchEventosDto } from './dto/search.dto';
import { UpdateEventoDto } from './dto/update.evento.sto';

@ApiTags('Eventos')
@Controller('eventos')
export class EventosController {
    constructor(
        private readonly eventosService: EventosService
    ){}
    @ApiOperation({ summary: 'Obtener todos los eventos' })
    @Post("all")
    @ApiResponse({
        status: 200,
        description: 'Lista de eventos encontrados.',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number', example: 1 },
                    nombre: { type: 'string', example: 'Concierto de Rock' },
                    descripcion: { type: 'string', example: 'Un gran concierto de rock con bandas famosas.' },
                    fecha: { type: 'string', example: '2025-07-15' },
                    hora: { type: 'string', example: '20:00' },
                    ubicacion: { type: 'string', example: 'Auditorio Nacional' },
                    organizador: { type: 'string', example: 'Juan Perez' },
                    valor: { type: 'string', example: '50.00' },
                    closed: { type: 'boolean', example: false }
                }
            },
            example: [
                {
                    id: 1,
                    nombre: 'Concierto de Rock',
                    descripcion: 'Un gran concierto de rock con bandas famosas.',
                    fecha: '2025-07-15',
                    hora: '20:00',
                    ubicacion: 'Auditorio Nacional',
                    organizador: 'Juan Perez',
                    valor: '50.00',
                    closed: false
                }
            ]
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Error interno del servidor.',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error'
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
    @ApiResponse({
        status: 500,
        description: 'Error interno del servidor.',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error'
            }
        }
    })
    async findById(@Param('id') id:number){
        return this.eventosService.findById(id);
    }

    @Post("create")
    @ApiOperation({ summary: 'Crear un nuevo evento' })
    @ApiResponse({
        status: 201,
        description: 'Evento creado exitosamente.',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1 },
                nombre: { type: 'string', example: 'Concierto de Rock' },
                descripcion: { type: 'string', example: 'Un gran concierto de rock con bandas famosas.' },
                fecha: { type: 'string', example: '2025-07-15' },
                hora: { type: 'string', example: '20:00' },
                ubicacion: { type: 'string', example: 'Auditorio Nacional' },
                organizador: { type: 'string', example: 'Juan Perez' },
                valor: { type: 'string', example: '50.00' },
                closed: { type: 'boolean', example: false }
            },
            example: {
                id: 1,
                nombre: 'Concierto de Rock',
                descripcion: 'Un gran concierto de rock con bandas famosas.',
                fecha: '2025-07-15',
                hora: '20:00',
                ubicacion: 'Auditorio Nacional',
                organizador: 'Juan Perez',
                valor: '50.00',
                closed: false
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Error interno del servidor.',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error'
            }
        }
    })
    async create(@Body() body:CreateEventoDto){
        return this.eventosService.create(body);
    }

    @Put("update/id/:id")
    @ApiOperation({ summary: 'Actualizar un evento existente' })
    @ApiResponse({
        status: 200,
        description: 'Evento actualizado exitosamente.',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1 },
                nombre: { type: 'string', example: 'Concierto de Rocks' },
                descripcion: { type: 'string', example: 'Un gran concierto de rock con bandas famosas.' },
                fecha: { type: 'string', example: '2025-07-15' },
                hora: { type: 'string', example: '20:00' },
                ubicacion: { type: 'string', example: 'Auditorio Nacional' },
                organizador: { type: 'string', example: 'Juan Perez' },
                valor: { type: 'string', example: '50.00' },
                closed: { type: 'boolean', example: false }
            },
            example: {
                id: 1,
                nombre: 'Concierto de Rocks',
                descripcion: 'Un gran concierto de rock con bandas famosas.',
                fecha: '2025-07-15',
                hora: '20:00',
                ubicacion: 'Auditorio Nacional',
                organizador: 'Juan Perez',
                valor: '50.00',
                closed: false
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'No se encontró ningún evento con ID proporcionado.',
        schema: {
            example: {
                message: 'No se encontró ningún evento con ID 4.',
                error: 'Not Found',
                statusCode: 404
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Error interno del servidor.',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error'
            }
        }
    })
    async update(@Param('id') id:number, @Body() body:UpdateEventoDto){
        return this.eventosService.update(id, body);
    }

    @Delete("delete/id/:id")
    @ApiOperation({ summary: 'Eliminar un evento por ID' })
    @ApiResponse({
        status: 200,
        description: 'Evento eliminado exitosamente.',
        schema: {
            example: {
                message: 'Evento con ID 1 eliminado exitosamente.'
            }
        }
    })
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
    @ApiResponse({
        status: 500,
        description: 'Error interno del servidor.',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error'
            }
        }
    })
    async delete(@Param('id') id:number){
        return this.eventosService.delete(id);
    }
}
