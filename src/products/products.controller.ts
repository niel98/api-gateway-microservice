import { Body, Controller, Delete, Get, HttpException, Logger, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateProductDto } from 'src/dtos/createProductDto.dto';
import { UpdateProductDto } from 'src/dtos/updateProductDto.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private service: ProductsService
    )
    {}

    @Post()
    async create(
        @Res() res: Response,
        @Body() payload: CreateProductDto
    ) {
        try {
            const response = await this.service.create(payload);

            return res.status(response.status).json(response);
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException(error.message, 500)
            return res.status(error.status || 500).json(error)
        }
    }

    @Get()
    async get(
        @Res() res: Response
    ) {
        try {
            const response = await this.service.get();

            return res.status(response.status).json(response);
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException(error.message, 500)
            return res.status(error.status || 500).json(error)
        }
    }

    @Put()
    async update(
        @Res() res: Response,
        @Body() payload: UpdateProductDto
    ) {
        try {
            const response = await this.service.update(payload);

            return res.status(response.status).json(response);
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException(error.message, 500)
            return res.status(error.status || 500).json(error)
        }
    }

    @Delete('/:id')
    async delete(
        @Req() req: Request,
        @Res() res: Response
    ) {
        try {
            const id = req.params.id;
            const response = await this.service.delete(id);

            return res.status(response.status).json(response);
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException(error.message, 500)
            return res.status(error.status || 500).json(error)
        }
    }
}
