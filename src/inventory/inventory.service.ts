import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createInventoryDto } from 'src/dtos/createInventoryDto.dto';
import { UpdateInventoryDto } from 'src/dtos/updateInventoryDto.dto';

@Injectable()
export class InventoryService {
    constructor(
        @Inject('INVENTORY_SERVICE') private readonly inventoryClient: ClientProxy
    )
    {}

    async createInventory(data: createInventoryDto) {
        try {   
            const response = await this.inventoryClient.send({ cmd: 'create-inventory'}, data).toPromise();
            console.log({ response })

            return Promise.resolve({ message: 'Inventory created successfully', status: 201, data: response });
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException('Internal server error', 500);
        }
    }

    async getInventories() {
        try {
            const response = await this.inventoryClient.send({ cmd: 'get-inventories'}, '').toPromise();
            console.log({ response })

            return Promise.resolve({ message: 'Inventories retrieved successfully', status: 200, data: response });
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException('Internal server error', 500);
        }
    }

    async updateInventory(data: UpdateInventoryDto) {
        try {
            const response = await this.inventoryClient.send({ cmd: 'update-inventory'}, data).toPromise();
            console.log(response)

            return Promise.resolve({ message: 'Inventory updated successfully', status: 200, data: response });
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException('Internal server error', 500);
        }
    }

    async deleteInventory(id: string) {
        try {
            const response = await this.inventoryClient.send({ cmd: 'delete-inventory'}, id).toPromise();
            console.log({ response })

            return Promise.resolve({ message: 'Inventory deleted successfully', status: 200, data: response });
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException('Internal server error', 500);
        }
    }
}
