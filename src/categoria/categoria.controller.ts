import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoriaDto } from './dto/create.categoria.dto';

@ApiTags('Categoría')
@Controller('categoria')
export class CategoriaController {

    constructor(
        private readonly categoriaService: CategoriaService,
    ){}

    @Get('all')
    @ApiOperation({ summary: 'Obtener todas las categorías' })
    @ApiResponse({
        status: 200,
        description: 'Lista de categorías.',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number', example: 1 },
                    nombre: { type: 'string', example: 'conciertos' }
                }
            },
            example: [
                { "id": 1, "nombre": "conciertos" }
            ]
        }
    })
    @ApiResponse({
        status: 404,
        description: 'No se encontraron categorías.',
        schema: {
            example: {
                message: 'No se encontraron categorías.',
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
    async findAll(){
        return this.categoriaService.findAll();
    }

    @Post('create')
    @ApiOperation({ summary: 'Crear una nueva categoría' })
    @ApiResponse({
        status: 201,
        description: 'Categoría creada exitosamente.',
        schema: {
            example: {
                id: 1,
                nombre: 'conciertos'
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
    async creatate(@Body() body:CreateCategoriaDto){
        return this.categoriaService.create(body);
    }

    @Put('update/:id')
    @ApiOperation({ summary: 'Actualizar una categoría por ID' })
    @ApiResponse({
        status: 200,
        description: 'Categoría actualizada exitosamente.',
        schema: {
            example: {
                id: 1,
                nombre: 'concierto'
            }
        }
    })
    @ApiResponse({
        status: 400,
        description: 'Ya existe una categoría con ese nombre.',
        schema: {
            example: {
                message: 'Ya existe una categoría con ese nombre.',
                error: 'Bad Request',
                statusCode: 400
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Categoría no encontrada.',
        schema: {
            example: {
                message: 'Categoría no encontrada.',
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
    async update(@Param('id') id: number, @Body() body: CreateCategoriaDto){
        return this.categoriaService.update(id, body);
    }
}
