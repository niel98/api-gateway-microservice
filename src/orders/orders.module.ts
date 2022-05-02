import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
    imports: [ClientsModule.register([
        {
          name: 'ORDER_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqps://oucmcbna:4hoAXqBxrU_HFPrldNiOjfQB2Zz8lvQj@rattlesnake.rmq.cloudamqp.com/oucmcbna'],
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
