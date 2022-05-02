import { Body, Controller, Delete, Get, HttpException, Logger, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateOrderDto } from 'src/dtos/createOrderDto.dto';
import { UpdateOrderDto } from 'src/dtos/updateOrderDto.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(
        private service: OrdersService
    )
    {}

    @Post()
    async create(
        @Res() res: Response,
        @Body() payload: CreateOrderDto
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
        @Body() payload: UpdateOrderDto
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
