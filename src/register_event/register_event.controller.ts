import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterEventService } from './register_event.service';
import { CreateRegsterDto } from './dto/create.register.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Registro de Eventos')
@Controller('register-event')
export class RegisterEventController {
    constructor(
        private readonly registerEventService:RegisterEventService
    ){}

    @Post("create")
    @ApiOperation({ summary: 'Crear un nuevo registro de evento' })
    @ApiResponse({
        status: 201,
        description: 'Registro de evento creado exitosamente.',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1 },
                nombre: { type: 'string', example: 'Juan Perez' },
                evento: {
                    type: 'object',
                    properties: {
                        id: { type: 'number', example: 2 },
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
                correo: { type: 'string', example: 'juan.perez@example.com' },
                telefono: { type: 'string', example: '555-1234' },
                metodo_pago: {
                    type: 'object',
                    properties: {
                        id: { type: 'number', example: 1 },
                        nombre: { type: 'string', example: 'efectivo' }
                    }
                },
                programa: { type: 'string', example: 'desarrollo de software' },
                terms_conditions: { type: 'boolean', example: true }
            },
            example: {
                id: 1,
                nombre: 'Juan Perez',
                evento: {
                    id: 2,
                    nombre: 'Concierto de Rock',
                    descripcion: 'Un gran concierto de rock con bandas famosas.',
                    fecha: '2025-07-15',
                    hora: '20:00',
                    ubicacion: 'Auditorio Nacional',
                    organizador: 'Juan Perez',
                    valor: '50.00',
                    closed: false
                },
                correo: 'juan.perez@example.com',
                telefono: '555-1234',
                metodo_pago: {
                    id: 1,
                    nombre: 'efectivo'
                },
                programa: 'desarrollo de software',
                terms_conditions: true
            }
        }
    })
    @ApiResponse({
        status: 400,
        description: 'El evento al que intenta registrarse no existe o no puedes registrarte',
        schema: {
            example: {
                message: 'El evento al que intenta registrarse no existe o no puedes registrarte',
                error: 'Bad Request',
                statusCode: 400
            }
        }
    })
    @ApiResponse({
        status: 401,
        description: 'No autorizado para registrar el evento.',
        schema: {
            example: {
                message: 'No autorizado para registrar el evento.',
                error: 'Unauthorized',
                statusCode: 401
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
    async createRegister(@Body() dto:CreateRegsterDto){
        return this.registerEventService.createRegister(dto);
    }

    @Get("event/:eventoId")
    @ApiOperation({ summary: 'Obtener registros por ID de evento' })
    @ApiResponse({
        status: 200,
        description: 'Lista de registros encontrados para el evento.',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number', example: 1 },
                    nombre: { type: 'string', example: 'Juan Perez' },
                    correo: { type: 'string', example: 'juan.perez@example.com' },
                    telefono: { type: 'string', example: '555-1234' },
                    metodo_pago: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            nombre: { type: 'string', example: 'efectivo' }
                        }
                    },
                    programa: { type: 'string', example: 'desarrollo de software' },
                    terms_conditions: { type: 'boolean', example: true }
                }
            },
            example: [
                {
                    id: 1,
                    nombre: 'Juan Perez',
                    correo: 'juan.perez@example.com',
                    telefono: '555-1234',
                    metodo_pago: {
                        id: 1,
                        nombre: 'efectivo'
                    },
                    programa: 'desarrollo de software',
                    terms_conditions: true
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
    async getRegistersByEvent(@Param('eventoId') eventoId:number){
        return this.registerEventService.getRegistersByEvent(eventoId);
    }

    @Get("all")
    @ApiOperation({ summary: 'Obtener todos los registros de eventos' })
    @ApiResponse({
        status: 200,
        description: 'Lista de todos los registros de eventos.',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number', example: 1 },
                    nombre: { type: 'string', example: 'Juan Perez' },
                    evento: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 2 },
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
                    correo: { type: 'string', example: 'juan.perez@example.com' },
                    telefono: { type: 'string', example: '555-1234' },
                    metodo_pago: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            nombre: { type: 'string', example: 'efectivo' }
                        }
                    },
                    programa: { type: 'string', example: 'desarrollo de software' },
                    terms_conditions: { type: 'boolean', example: true }
                }
            },
            example: [
                {
                    id: 1,
                    nombre: 'Juan Perez',
                    evento: {
                        id: 2,
                        nombre: 'Concierto de Rock',
                        descripcion: 'Un gran concierto de rock con bandas famosas.',
                        fecha: '2025-07-15',
                        hora: '20:00',
                        ubicacion: 'Auditorio Nacional',
                        organizador: 'Juan Perez',
                        valor: '50.00',
                        closed: false
                    },
                    correo: 'juan.perez@example.com',
                    telefono: '555-1234',
                    metodo_pago: {
                        id: 1,
                        nombre: 'efectivo'
                    },
                    programa: 'desarrollo de software',
                    terms_conditions: true
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
    async getAllRegisters(){
        return this.registerEventService.getAllRegisters();
    }

    @Get("count/event/:eventId")
    @ApiOperation({ summary: 'Contar registros por ID de evento' })
    @ApiResponse({
        status: 200,
        description: 'Cantidad de registros para el evento.',
        schema: {
            type: 'number',
            example: 1
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
    async countRegisterByEvent(@Param('eventId') eventId:number):Promise<number>{
        return this.registerEventService.countRegistersByEvent(eventId);
    }

    @Get("registers/email/:correo")
    @ApiOperation({ summary: 'Obtener registros por correo electrónico' })
    @ApiResponse({
        status: 200,
        description: 'Lista de registros encontrados por correo electrónico.',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number', example: 1 },
                    nombre: { type: 'string', example: 'Juan Perez' },
                    correo: { type: 'string', example: 'juan.perez@example.com' },
                    telefono: { type: 'string', example: '555-1234' },
                    metodo_pago: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            nombre: { type: 'string', example: 'efectivo' }
                        }
                    },
                    programa: { type: 'string', example: 'desarrollo de software' },
                    terms_conditions: { type: 'boolean', example: true }
                }
            },
            example: [
                {
                    id: 1,
                    nombre: 'Juan Perez',
                    correo: 'juan.perez@example.com',
                    telefono: '555-1234',
                    metodo_pago: {
                        id: 1,
                        nombre: 'efectivo'
                    },
                    programa: 'desarrollo de software',
                    terms_conditions: true
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
    async getRegisterByemail(@Param('correo') correo:string){
        return this.registerEventService.getRegisterByemail(correo);
    }

    @Get("registers/phone/:telefono")
    @ApiOperation({ summary: 'Obtener registros por número de teléfono' })
    @ApiResponse({
        status: 200,
        description: 'Lista de registros encontrados por número de teléfono.',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number', example: 1 },
                    nombre: { type: 'string', example: 'Juan Perez' },
                    correo: { type: 'string', example: 'juan.perez@example.com' },
                    telefono: { type: 'string', example: '555-1234' },
                    metodo_pago: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            nombre: { type: 'string', example: 'efectivo' }
                        }
                    },
                    programa: { type: 'string', example: 'desarrollo de software' },
                    terms_conditions: { type: 'boolean', example: true }
                }
            },
            example: [
                {
                    id: 1,
                    nombre: 'Juan Perez',
                    correo: 'juan.perez@example.com',
                    telefono: '555-1234',
                    metodo_pago: {
                        id: 1,
                        nombre: 'efectivo'
                    },
                    programa: 'desarrollo de software',
                    terms_conditions: true
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
    async getRegistersByPhone(@Param('telefono') telefono:string){
        return this.registerEventService.getRegisterByPhone(telefono);
    }
}
