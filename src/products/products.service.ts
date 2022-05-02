import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from 'src/dtos/createProductDto.dto';
import { UpdateProductDto } from 'src/dtos/updateProductDto.dto';

@Injectable()
export class ProductsService {
    constructor(
        @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy
    )
    {}

    async create(payload: CreateProductDto) {
        try {
            const response = await this.productClient.send({ cmd: 'create-product'}, payload)
            .toPromise();
            
            return Promise.resolve({ message: 'Product created successfully!', status: 201, data: response });
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException('Internal server error', 500);
        }
    }

    async get() {
        try {
            const response = await this.productClient.send({ cmd: 'get-all-products'}, '').toPromise();

            return Promise.resolve({ message: 'Products retrieved successfully!', status: 200, data: response });
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException('Internal server error', 500);
        }
    }

    async update(data: UpdateProductDto) {
        try {
            const response = await this.productClient.send({ cmd: 'update-product'}, data).toPromise();

            return Promise.resolve({ message: 'Product updated successfully!', status: 200, data: response });
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException('Internal server error', 500);
        }
    }

    async delete(id: any) {
        try {
            const response = await this.productClient.send({ cmd: 'delete-product'}, id).toPromise();

            return Promise.resolve({ message: 'Product deleted successfully!', status: 200, data: response });
        } catch (error) {
            Logger.error(error)
            if (error.name === 'TypeError') throw new HttpException('Internal server error', 500);
        }
    }
}
