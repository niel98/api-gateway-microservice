import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import * as dotenv from 'dotenv';

dotenv.config()

@Module({
    imports: [ClientsModule.register([
        {
          name: 'ORDER_SERVICE',
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
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
