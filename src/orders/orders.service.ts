import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from 'src/dtos/createOrderDto.dto';
import { UpdateOrderDto } from 'src/dtos/updateOrderDto.dto';

@Injectable()
export class OrdersService {
    constructor(
        @Inject('ORDER_SERVICE') private readonly ordersClient: ClientProxy
    )
    {}

    async create(payload: CreateOrderDto) {
        try {
            const response = await this.ordersClient.send({ cmd: 'create-order' }, payload).toPromise();

            return Promise.resolve({ message: 'Order created successfully', status: 201, data: response });
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException('Internal server error', 500);
        }
    }

    async get() {
        try {
            const response = await this.ordersClient.send({ cmd: 'get-orders' }, '').toPromise();

            return Promise.resolve({ message: 'Orders retrieved successfully', status: 200, data: response });
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException('Internal server error', 500);
        }
    }

    async update(payload: UpdateOrderDto) {
        try {
            const response = await this.ordersClient.send({ cmd: 'update-order' }, payload).toPromise();

            return Promise.resolve({ message: 'Order updated successfully', status: 200, data: response });
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException('Internal server error', 500);
        }
    }

    async delete(id: string) {
        try {
            const response = await this.ordersClient.send({ cmd: 'delete-order' }, id).toPromise();

            return Promise.resolve({ message: 'Order deleted successfully', status: 200, data: response });
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException('Internal server error', 500);
        }
    }
}
