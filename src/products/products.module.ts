import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URI],
        queue: 'main_queue',
        queueOptions: {
          durable: false
        }
      }
    },
  ]),],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
