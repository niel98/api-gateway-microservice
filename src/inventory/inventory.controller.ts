import { Body, Controller, Delete, Get, HttpException, Logger, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { createInventoryDto } from 'src/dtos/createInventoryDto.dto';
import { UpdateInventoryDto } from 'src/dtos/updateInventoryDto.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
    constructor(
        private service: InventoryService
    )
    {}

    @Post()
    async create(
        @Res() res: Response,
        @Body() payload: createInventoryDto
    ) {
        try {
            const response = await this.service.createInventory(payload);

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
            const response = await this.service.getInventories();

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
        @Body() payload: UpdateInventoryDto
    ) {
        try {
            const response = await this.service.updateInventory(payload);

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
            const response = await this.service.deleteInventory(id);

            return res.status(response.status).json(response);
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException(error.message, 500)
            return res.status(error.status || 500).json(error)
        }
    }
}
