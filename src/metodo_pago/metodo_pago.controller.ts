import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { MetodoPagoService } from './metodo_pago.service';
import { CreateMetodoPagoDto } from './dto/create.metodo.pago.dto';

@ApiTags('Metodo de Pago')
@Controller('metodo-pago')
export class MetodoPagoController {
    constructor(
        private readonly metodoPagoService: MetodoPagoService
    ){}

    @Get("all")
    @ApiOperation({ summary: 'Obtener todos los métodos de pago' })
    @ApiResponse({
        status: 200,
        description: 'Lista de métodos de pago.',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number', example: 1 },
                    nombre: { type: 'string', example: 'efectivo' }
                }
            },
            example: [
                { id: 1, nombre: 'efectivo' },
                { id: 2, nombre: 'tarjeta' }
            ]
        }
    })
    @ApiResponse({ status: 404, description: 'No se encontraron métodos de pago.' })
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
    async findAll() {
        return this.metodoPagoService.fynAll();
    }

    @Get("/name/:name")
    @ApiOperation({ summary: 'Obtener método de pago por nombre' })
    @ApiParam({ name: 'name', type: String })
    @ApiResponse({
        status: 200,
        description: 'Método de pago encontrado.',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1 },
                nombre: { type: 'string', example: 'efectivo' }
            },
            example: { id: 1, nombre: 'efectivo' }
        }
    })
    @ApiResponse({ status: 404, description: 'Método de pago no encontrado.' })
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
    async getByName(@Param('name') name: string) {
        return this.metodoPagoService.getByName(name);
    }

    @Get("id/:id")
    @ApiOperation({ summary: 'Obtener método de pago por ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: 200,
        description: 'Método de pago encontrado.',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1 },
                nombre: { type: 'string', example: 'efectivo' }
            },
            example: { id: 1, nombre: 'efectivo' }
        }
    })
    @ApiResponse({ status: 404, description: 'Método de pago no encontrado.' })
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
    async findOne(@Param('id') id: number) {
        return this.metodoPagoService.findOne(id);
    }

    @Post("create")
    @ApiOperation({ summary: 'Crear método de pago' })
    @ApiBody({ type: CreateMetodoPagoDto })
    @ApiResponse({
        status: 201,
        description: 'Método de pago creado.',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 2 },
                nombre: { type: 'string', example: 'tarjeta de crédito' }
            },
            example: { id: 2, nombre: 'tarjeta de crédito' }
        }
    })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
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
    async createMetodoPago(@Body() body:CreateMetodoPagoDto) {
        return this.metodoPagoService.createMetodoPago(body.name);
    }

    @Delete("delete/:id")
    @ApiOperation({ summary: 'Eliminar método de pago por ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: 200,
        description: 'Método de pago eliminado.',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Metodo de pago eliminado correctamente' }
            },
            example: { message: 'Metodo de pago eliminado correctamente' }
        }
    })
    @ApiResponse({ status: 404, description: 'Método de pago no encontrado.' })
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
    async deleteMetodoPago(@Param('id') id:number){
        return this.metodoPagoService.deleteMetodoPago(id);
    }
}
