import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'INVENTORY_SERVICE',
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
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
